from mailjet_rest import Client
from django.conf import settings
from django.template.loader import render_to_string
from .models import MailjetSettings
import logging
import json

logger = logging.getLogger(__name__)


def get_mailjet_client():
    """Get Mailjet client with stored credentials"""
    try:
        mailjet_settings = MailjetSettings.get_active_settings()
        
        if not mailjet_settings:
            raise Exception("Mailjet settings not configured. Please configure at /account/mailjet-setup/ or admin panel.")
        
        api_key = mailjet_settings.api_key
        api_secret = mailjet_settings.api_secret
        
        if not api_key or not api_secret:
            raise Exception("Mailjet API credentials are incomplete. Please check your settings.")
        
        return Client(auth=(api_key, api_secret), version='v3.1')
    except ImportError:
        raise Exception("Mailjet package not installed. Please run: pip install mailjet-rest")


def send_otp_email(email, otp, user_name=None):
    """
    Send OTP email using Mailjet
    
    Args:
        email: Recipient email address
        otp: 6-digit OTP code
        user_name: Optional user name
    
    Returns:
        tuple: (bool, str) - (success, error_message)
    """
    try:
        mailjet = get_mailjet_client()
        mailjet_settings = MailjetSettings.get_active_settings()
        
        if not mailjet_settings:
            error_msg = "Mailjet settings not configured. Please configure at /account/mailjet-setup/"
            logger.error(error_msg)
            return False, error_msg
        
        user_name = user_name or email.split('@')[0]
        
        # Render email templates
        context = {
            'user_name': user_name,
            'otp': otp
        }
        
        try:
            html_content = render_to_string('account/emails/password_reset_otp.html', context)
            text_content = render_to_string('account/emails/password_reset_otp.txt', context)
        except Exception as e:
            error_msg = f"Error rendering email template: {str(e)}"
            logger.error(error_msg)
            return False, error_msg
        
        # Validate email format
        if '@' not in email or '.' not in email.split('@')[1]:
            error_msg = "Invalid email format"
            logger.error(f"Invalid email format: {email}")
            return False, error_msg
        
        # Validate from_email
        if '@' not in mailjet_settings.from_email:
            error_msg = "Invalid sender email format in settings"
            logger.error(f"Invalid sender email: {mailjet_settings.from_email}")
            return False, error_msg
        
        data = {
            'Messages': [
                {
                    "From": {
                        "Email": mailjet_settings.from_email,
                        "Name": mailjet_settings.from_name
                    },
                    "To": [
                        {
                            "Email": email,
                            "Name": user_name
                        }
                    ],
                    "Subject": "Password Reset OTP - Sreca",
                    "TextPart": text_content,
                    "HTMLPart": html_content
                }
            ]
        }
        
        # Log request data (without sensitive info)
        logger.debug(f"Sending email to {email} from {mailjet_settings.from_email}")
        
        try:
            result = mailjet.send.create(data=data)
        except Exception as api_error:
            error_msg = f"Failed to connect to Mailjet API: {str(api_error)}"
            logger.error(error_msg)
            return False, error_msg
        
        # Check response status
        if result.status_code == 200:
            # Check if response is successful
            try:
                # Try to get response data safely
                response_data = {}
                if hasattr(result, 'json'):
                    try:
                        response_data = result.json()
                    except (ValueError, AttributeError, TypeError):
                        # If JSON parsing fails but status is 200, assume success
                        logger.info(f"OTP email sent successfully to {email} (status 200, non-JSON response)")
                        return True, None
                
                # Mailjet returns success with 200, check Messages array if available
                if isinstance(response_data, dict):
                    messages = response_data.get('Messages', [])
                    if messages and len(messages) > 0:
                        # Check if message was sent successfully
                        message_status = messages[0].get('Status', '')
                        if message_status == 'success' or 'Sent' in str(message_status):
                            logger.info(f"OTP email sent successfully to {email}")
                            return True, None
                        else:
                            error_msg = f"Mailjet API: Message status - {message_status}"
                            logger.error(f"Failed to send OTP email to {email}: {error_msg}")
                            return False, error_msg
                else:
                    # Status 200 but no messages array - assume success
                    logger.info(f"OTP email sent successfully to {email}")
                    return True, None
            except Exception as e:
                # If we can't parse but status is 200, assume success
                logger.warning(f"Could not parse Mailjet response but status is 200: {str(e)}")
                logger.info(f"OTP email sent successfully to {email} (status 200)")
                return True, None
        else:
            # Handle error response - Status 400 usually means bad request
            error_msg = f"Mailjet API error: Status {result.status_code}"
            error_details = []
            
            try:
                # Try to get response content first - check multiple attributes
                response_text = None
                response_content = None
                
                # Log all available attributes for debugging
                logger.error(f"Mailjet response attributes: {dir(result)}")
                logger.error(f"Mailjet response status: {result.status_code}")
                
                # Try different ways to get response content
                if hasattr(result, 'text'):
                    response_text = result.text
                    logger.error(f"Response.text type: {type(response_text)}, value: {response_text[:200] if response_text else 'None'}")
                elif hasattr(result, 'content'):
                    response_text = result.content
                elif hasattr(result, 'body'):
                    response_text = result.body
                elif hasattr(result, 'data'):
                    response_text = result.data
                
                # Try to get as string if bytes
                if response_text and isinstance(response_text, bytes):
                    try:
                        response_text = response_text.decode('utf-8')
                    except:
                        response_text = str(response_text)
                
                if response_text and response_text.strip():
                    error_details.append(f"Response: {response_text[:500]}")
                    response_content = response_text
                else:
                    error_details.append("Empty response from Mailjet API")
                
                # Try to parse error response
                error_data = None
                if hasattr(result, 'json'):
                    try:
                        error_data = result.json()
                    except (ValueError, AttributeError, TypeError, json.JSONDecodeError) as json_error:
                        # JSON parsing failed - response might be empty or HTML
                        error_details.append(f"Could not parse JSON: {str(json_error)}")
                        if response_content:
                            error_details.append(f"Raw response (first 300 chars): {response_content[:300]}")
                elif hasattr(result, 'data'):
                    # Try to get data directly
                    try:
                        error_data = result.data
                    except:
                        pass
                
                # If we got error data, parse it
                if error_data:
                    logger.error(f"Mailjet error response: {error_data}")
                    
                    if isinstance(error_data, dict):
                        # Check for common error fields in Mailjet response
                        error_info = (
                            error_data.get('ErrorMessage') or 
                            error_data.get('message') or 
                            error_data.get('Error') or
                            error_data.get('error') or
                            error_data.get('ErrorInfo') or
                            error_data.get('ErrorIdentifier')
                        )
                        if error_info:
                            error_details.append(str(error_info))
                        
                        # Check for Errors array (Mailjet format)
                        if 'Errors' in error_data:
                            errors = error_data['Errors']
                            if isinstance(errors, list) and len(errors) > 0:
                                for err in errors:
                                    if isinstance(err, dict):
                                        err_msg = err.get('ErrorMessage') or err.get('Error') or err.get('ErrorCode') or str(err)
                                        error_details.append(f"Error: {err_msg}")
                        
                        # Check for ErrorMessage in Messages array
                        if 'Messages' in error_data:
                            messages = error_data['Messages']
                            if isinstance(messages, list):
                                for msg in messages:
                                    if isinstance(msg, dict) and 'Errors' in msg:
                                        for err in msg['Errors']:
                                            if isinstance(err, dict):
                                                err_msg = err.get('ErrorMessage') or err.get('Error') or str(err)
                                                error_details.append(f"Message Error: {err_msg}")
                                
                    elif isinstance(error_data, list) and len(error_data) > 0:
                        first_error = error_data[0]
                        if isinstance(first_error, dict):
                            error_info = (
                                first_error.get('ErrorMessage') or 
                                first_error.get('message') or 
                                first_error.get('Error')
                            )
                            if error_info:
                                error_details.append(str(error_info))
                
                # Build final error message
                if error_details:
                    error_msg = f"Mailjet API error (Status {result.status_code}): " + " | ".join(error_details)
                else:
                    # Provide helpful message for common 400 errors
                    if result.status_code == 400:
                        error_msg = "Mailjet API error (400 Bad Request). Common causes: Invalid API credentials, unverified sender email, or invalid email format. Please check your Mailjet settings at /account/mailjet-setup/"
                    else:
                        error_msg = f"Mailjet API error: Status {result.status_code} - Invalid request. Please check API credentials and email format."
                    
            except Exception as e:
                error_msg = f"Mailjet API error: Status {result.status_code} - {str(e)}"
            
            logger.error(f"Failed to send OTP email to {email}: {error_msg}")
            return False, error_msg
            
    except ImportError:
        error_msg = "Mailjet package not installed. Please run: pip install mailjet-rest"
        logger.error(error_msg)
        return False, error_msg
    except Exception as e:
        error_msg = f"Error sending email: {str(e)}"
        logger.error(f"Error sending OTP email to {email}: {error_msg}")
        return False, error_msg


def send_confirmation_email(email, user_name=None):
    """
    Send account confirmation email using Mailjet
    
    Args:
        email: Recipient email address
        user_name: Optional user name
    
    Returns:
        tuple: (bool, str) - (success, error_message)
    """
    try:
        mailjet = get_mailjet_client()
        mailjet_settings = MailjetSettings.get_active_settings()
        
        if not mailjet_settings:
            error_msg = "Mailjet settings not configured. Please configure at /account/mailjet-setup/"
            logger.error(error_msg)
            return False, error_msg
        
        user_name = user_name or email.split('@')[0]
        
        # Render email templates
        context = {
            'user_name': user_name,
            'email': email
        }
        
        try:
            html_content = render_to_string('account/emails/account_confirmation.html', context)
            text_content = render_to_string('account/emails/account_confirmation.txt', context)
        except Exception as e:
            error_msg = f"Error rendering email template: {str(e)}"
            logger.error(error_msg)
            return False, error_msg
        
        # Validate email format
        if '@' not in email or '.' not in email.split('@')[1]:
            error_msg = "Invalid email format"
            logger.error(f"Invalid email format: {email}")
            return False, error_msg
        
        # Validate from_email
        if '@' not in mailjet_settings.from_email:
            error_msg = "Invalid sender email format in settings"
            logger.error(f"Invalid sender email: {mailjet_settings.from_email}")
            return False, error_msg
        
        data = {
            'Messages': [
                {
                    "From": {
                        "Email": mailjet_settings.from_email,
                        "Name": mailjet_settings.from_name
                    },
                    "To": [
                        {
                            "Email": email,
                            "Name": user_name
                        }
                    ],
                    "Subject": "Welcome to Sreca - Account Created Successfully",
                    "TextPart": text_content,
                    "HTMLPart": html_content
                }
            ]
        }
        
        # Log request data (without sensitive info)
        logger.debug(f"Sending confirmation email to {email} from {mailjet_settings.from_email}")
        
        try:
            result = mailjet.send.create(data=data)
        except Exception as api_error:
            error_msg = f"Failed to connect to Mailjet API: {str(api_error)}"
            logger.error(error_msg)
            return False, error_msg
        
        # Check response status
        if result.status_code == 200:
            try:
                response_data = {}
                if hasattr(result, 'json'):
                    try:
                        response_data = result.json()
                    except (ValueError, AttributeError, TypeError):
                        logger.info(f"Confirmation email sent successfully to {email} (status 200, non-JSON response)")
                        return True, None
                
                if isinstance(response_data, dict):
                    messages = response_data.get('Messages', [])
                    if messages and len(messages) > 0:
                        message_status = messages[0].get('Status', '')
                        if message_status == 'success' or 'Sent' in str(message_status):
                            logger.info(f"Confirmation email sent successfully to {email}")
                            return True, None
                        else:
                            error_msg = f"Mailjet API: Message status - {message_status}"
                            logger.error(f"Failed to send confirmation email to {email}: {error_msg}")
                            return False, error_msg
                else:
                    logger.info(f"Confirmation email sent successfully to {email}")
                    return True, None
            except Exception as e:
                logger.warning(f"Could not parse Mailjet response but status is 200: {str(e)}")
                logger.info(f"Confirmation email sent successfully to {email} (status 200)")
                return True, None
        else:
            error_msg = f"Mailjet API error: Status {result.status_code}"
            
            try:
                response_text = None
                if hasattr(result, 'text'):
                    response_text = result.text
                elif hasattr(result, 'content'):
                    response_text = result.content
                elif hasattr(result, 'body'):
                    response_text = result.body
                
                if response_text and isinstance(response_text, bytes):
                    try:
                        response_text = response_text.decode('utf-8')
                    except:
                        response_text = str(response_text)
                
                if response_text and response_text.strip():
                    error_msg = f"Mailjet API error (Status {result.status_code}): {response_text[:500]}"
                else:
                    if result.status_code == 400:
                        error_msg = "Mailjet API error (400 Bad Request). Common causes: Invalid API credentials, unverified sender email, or invalid email format. Please check your Mailjet settings at /account/mailjet-setup/"
                    else:
                        error_msg = f"Mailjet API error: Status {result.status_code} - Invalid request. Please check API credentials and email format."
            except Exception as e:
                error_msg = f"Mailjet API error: Status {result.status_code} - {str(e)}"
            
            logger.error(f"Failed to send confirmation email to {email}: {error_msg}")
            return False, error_msg
            
    except ImportError:
        error_msg = "Mailjet package not installed. Please run: pip install mailjet-rest"
        logger.error(error_msg)
        return False, error_msg
    except Exception as e:
        error_msg = f"Error sending email: {str(e)}"
        logger.error(f"Error sending confirmation email to {email}: {error_msg}")
        return False, error_msg
