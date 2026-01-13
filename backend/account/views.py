from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.utils import timezone
from datetime import timedelta
import json
import logging
from .models import PasswordResetOTP, UserProfile
from .utils import send_otp_email, send_confirmation_email

logger = logging.getLogger(__name__)


def json_response_cors(data, status=200):
    """Helper function to create JSON response with CORS headers"""
    response = JsonResponse(data, status=status)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

# Create your views here.

@csrf_exempt
def signup_api(request):
    """
    API endpoint for user registration
    """
    # Handle CORS preflight
    if request.method == 'OPTIONS':
        response = JsonResponse({})
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response
    
    if request.method != 'POST':
        return json_response_cors({
            'success': False,
            'message': 'Method not allowed'
        }, status=405)
    
    # Check if user is already authenticated/logged in
    if request.user.is_authenticated:
        return json_response_cors({
            'success': False,
            'message': 'You are already logged in. Please logout first to create a new account.'
        }, status=403)
    
    try:
        data = json.loads(request.body)
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        password = data.get('password', '')
        confirm_password = data.get('confirm-password', '')
        
        # Validation
        if not name or not email or not password or not confirm_password:
            return json_response_cors({
                'success': False,
                'message': 'All fields are required'
            }, status=400)
        
        if password != confirm_password:
            return json_response_cors({
                'success': False,
                'message': 'Passwords do not match'
            }, status=400)
        
        if len(password) < 8:
            return json_response_cors({
                'success': False,
                'message': 'Password must be at least 8 characters long'
            }, status=400)
        
        # Check if user already exists
        if User.objects.filter(username=email).exists():
            return json_response_cors({
                'success': False,
                'message': 'User with this email already exists'
            }, status=400)
        
        if User.objects.filter(email=email).exists():
            return json_response_cors({
                'success': False,
                'message': 'User with this email already exists'
            }, status=400)
        
        # Create user
        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=name
        )
        
        # Send confirmation email
        email_sent, email_error = send_confirmation_email(email, name)
        if not email_sent:
            # Log error but don't fail registration if email fails
            logger.warning(f"Failed to send confirmation email to {email}: {email_error}")
        
        return json_response_cors({
            'success': True,
            'message': 'User registered successfully',
            'user': {
                'id': user.id,
                'name': user.first_name,
                'email': user.email,
                'username': user.username
            }
        }, status=201)
        
    except json.JSONDecodeError:
        return json_response_cors({
            'success': False,
            'message': 'Invalid JSON data'
        }, status=400)
    except Exception as e:
        return json_response_cors({
            'success': False,
            'message': str(e)
        }, status=500)


@csrf_exempt
def login_api(request):
    """
    API endpoint for user login
    """
    # Handle CORS preflight
    if request.method == 'OPTIONS':
        response = JsonResponse({})
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response
    
    if request.method != 'POST':
        return json_response_cors({
            'success': False,
            'message': 'Method not allowed'
        }, status=405)
    
    # Check if user is already authenticated/logged in
    if request.user.is_authenticated:
        return json_response_cors({
            'success': False,
            'message': 'You are already logged in. Please logout first.'
        }, status=403)
    
    try:
        data = json.loads(request.body)
        email = data.get('email', '').strip()
        password = data.get('password', '')
        
        # Validation
        if not email or not password:
            return json_response_cors({
                'success': False,
                'message': 'Email and password are required'
            }, status=400)
        
        # Authenticate user
        # Since we're using email as username, we need to find user by email first
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return json_response_cors({
                'success': False,
                'message': 'Invalid email or password'
            }, status=401)
        
        # Authenticate using username (which is email in our case)
        user = authenticate(request, username=user.username, password=password)
        
        if user is not None:
            if user.is_active:
                return json_response_cors({
                    'success': True,
                    'message': 'Login successful',
                    'user': {
                        'id': user.id,
                        'name': user.first_name,
                        'email': user.email,
                        'username': user.username
                    }
                }, status=200)
            else:
                return json_response_cors({
                    'success': False,
                    'message': 'Your account has been deactivated'
                }, status=403)
        else:
            return json_response_cors({
                'success': False,
                'message': 'Invalid email or password'
            }, status=401)
        
    except json.JSONDecodeError:
        return json_response_cors({
            'success': False,
            'message': 'Invalid JSON data'
        }, status=400)
    except Exception as e:
        return json_response_cors({
            'success': False,
            'message': str(e)
        }, status=500)


@csrf_exempt
def forgot_password_send_otp(request):
    """
    API endpoint to send OTP for password reset
    """
    # Handle CORS preflight
    if request.method == 'OPTIONS':
        response = JsonResponse({})
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response
    
    if request.method != 'POST':
        return json_response_cors({
            'success': False,
            'message': 'Method not allowed'
        }, status=405)
    
    try:
        data = json.loads(request.body)
        email = data.get('email', '').strip().lower()
        
        # Validation
        if not email:
            return json_response_cors({
                'success': False,
                'message': 'Email is required'
            }, status=400)
        
        # Check if user exists
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            # Don't reveal if user exists for security
            return json_response_cors({
                'success': True,
                'message': 'If the email exists, an OTP has been sent.'
            }, status=200)
        
        # Generate OTP
        otp = PasswordResetOTP.generate_otp()
        expires_at = timezone.now() + timedelta(minutes=15)
        
        # Create or update OTP record
        otp_record, created = PasswordResetOTP.objects.update_or_create(
            user=user,
            email=email,
            defaults={
                'otp': otp,
                'is_verified': False,
                'expires_at': expires_at
            }
        )
        
        # Send email
        email_sent, error_message = send_otp_email(
            email=email,
            otp=otp,
            user_name=user.first_name or user.username
        )
        
        if email_sent:
            return json_response_cors({
                'success': True,
                'message': 'OTP sent to your email address'
            }, status=200)
        else:
            # Provide helpful error message
            if 'not configured' in error_message.lower() or 'not installed' in error_message.lower():
                return json_response_cors({
                    'success': False,
                    'message': error_message or 'Mailjet is not configured. Please contact administrator.'
                }, status=500)
            else:
                return json_response_cors({
                    'success': False,
                    'message': error_message or 'Failed to send email. Please try again later.'
                }, status=500)
        
    except json.JSONDecodeError:
        return json_response_cors({
            'success': False,
            'message': 'Invalid JSON data'
        }, status=400)
    except Exception as e:
        return json_response_cors({
            'success': False,
            'message': str(e)
        }, status=500)


@csrf_exempt
def forgot_password_verify_otp(request):
    """
    API endpoint to verify OTP
    """
    # Handle CORS preflight
    if request.method == 'OPTIONS':
        response = JsonResponse({})
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response
    
    if request.method != 'POST':
        return json_response_cors({
            'success': False,
            'message': 'Method not allowed'
        }, status=405)
    
    try:
        data = json.loads(request.body)
        email = data.get('email', '').strip().lower()
        otp = data.get('otp', '').strip()
        
        # Validation
        if not email or not otp:
            return json_response_cors({
                'success': False,
                'message': 'Email and OTP are required'
            }, status=400)
        
        if len(otp) != 6:
            return json_response_cors({
                'success': False,
                'message': 'OTP must be 6 digits'
            }, status=400)
        
        # Get OTP record
        try:
            otp_record = PasswordResetOTP.objects.filter(
                email=email,
                otp=otp,
                is_verified=False
            ).order_by('-created_at').first()
        except PasswordResetOTP.DoesNotExist:
            otp_record = None
        
        if not otp_record:
            return json_response_cors({
                'success': False,
                'message': 'Invalid or expired OTP'
            }, status=400)
        
        # Check if expired
        if otp_record.is_expired():
            return json_response_cors({
                'success': False,
                'message': 'OTP has expired. Please request a new one.'
            }, status=400)
        
        # Mark as verified
        otp_record.is_verified = True
        otp_record.save()
        
        return json_response_cors({
            'success': True,
            'message': 'OTP verified successfully',
            'token': str(otp_record.id)  # Simple token for next step
        }, status=200)
        
    except json.JSONDecodeError:
        return json_response_cors({
            'success': False,
            'message': 'Invalid JSON data'
        }, status=400)
    except Exception as e:
        return json_response_cors({
            'success': False,
            'message': str(e)
        }, status=500)


@csrf_exempt
def forgot_password_reset(request):
    """
    API endpoint to reset password after OTP verification
    """
    # Handle CORS preflight
    if request.method == 'OPTIONS':
        response = JsonResponse({})
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response
    
    if request.method != 'POST':
        return json_response_cors({
            'success': False,
            'message': 'Method not allowed'
        }, status=405)
    
    try:
        data = json.loads(request.body)
        email = data.get('email', '').strip().lower()
        otp = data.get('otp', '').strip()
        password = data.get('password', '')
        confirm_password = data.get('confirmPassword', '')
        
        # Validation
        if not email or not otp or not password or not confirm_password:
            return json_response_cors({
                'success': False,
                'message': 'All fields are required'
            }, status=400)
        
        if password != confirm_password:
            return json_response_cors({
                'success': False,
                'message': 'Passwords do not match'
            }, status=400)
        
        if len(password) < 8:
            return json_response_cors({
                'success': False,
                'message': 'Password must be at least 8 characters long'
            }, status=400)
        
        # Verify OTP
        try:
            otp_record = PasswordResetOTP.objects.get(
                email=email,
                otp=otp,
                is_verified=True
            )
        except PasswordResetOTP.DoesNotExist:
            return json_response_cors({
                'success': False,
                'message': 'Invalid OTP or OTP not verified'
            }, status=400)
        
        # Check if expired (even if verified, check expiration)
        if otp_record.is_expired():
            return json_response_cors({
                'success': False,
                'message': 'OTP has expired. Please start the process again.'
            }, status=400)
        
        # Reset password
        user = otp_record.user
        user.set_password(password)
        user.save()
        
        # Mark all OTPs for this user as used
        PasswordResetOTP.objects.filter(user=user, email=email).update(is_verified=True)
        
        return json_response_cors({
            'success': True,
            'message': 'Password reset successfully'
        }, status=200)
        
    except json.JSONDecodeError:
        return json_response_cors({
            'success': False,
            'message': 'Invalid JSON data'
        }, status=400)
    except Exception as e:
        return json_response_cors({
            'success': False,
            'message': str(e)
        }, status=500)


@csrf_exempt
def forgot_password_resend_otp(request):
    """
    API endpoint to resend OTP
    """
    # Handle CORS preflight
    if request.method == 'OPTIONS':
        response = JsonResponse({})
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response
    
    if request.method != 'POST':
        return json_response_cors({
            'success': False,
            'message': 'Method not allowed'
        }, status=405)
    
    try:
        data = json.loads(request.body)
        email = data.get('email', '').strip().lower()
        
        if not email:
            return json_response_cors({
                'success': False,
                'message': 'Email is required'
            }, status=400)
        
        # Check if user exists
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return json_response_cors({
                'success': True,
                'message': 'If the email exists, an OTP has been sent.'
            }, status=200)
        
        # Generate new OTP
        otp = PasswordResetOTP.generate_otp()
        expires_at = timezone.now() + timedelta(minutes=15)
        
        # Create new OTP record (don't update, create new one)
        otp_record = PasswordResetOTP.objects.create(
            user=user,
            email=email,
            otp=otp,
            is_verified=False,
            expires_at=expires_at
        )
        
        # Send email
        email_sent, error_message = send_otp_email(
            email=email,
            otp=otp,
            user_name=user.first_name or user.username
        )
        
        if email_sent:
            return json_response_cors({
                'success': True,
                'message': 'New OTP sent to your email address'
            }, status=200)
        else:
            # Provide helpful error message
            if 'not configured' in error_message.lower() or 'not installed' in error_message.lower():
                return json_response_cors({
                    'success': False,
                    'message': error_message or 'Mailjet is not configured. Please contact administrator.'
                }, status=500)
            else:
                return json_response_cors({
                    'success': False,
                    'message': error_message or 'Failed to send email. Please try again later.'
                }, status=500)
        
    except json.JSONDecodeError:
        return json_response_cors({
            'success': False,
            'message': 'Invalid JSON data'
        }, status=400)
    except Exception as e:
        return json_response_cors({
            'success': False,
            'message': str(e)
        }, status=500)


def mailjet_setup(request):
    """
    Template view for Mailjet API setup
    """
    from .models import MailjetSettings
    from django.contrib import messages
    
    settings = MailjetSettings.get_active_settings()
    
    if request.method == 'POST':
        api_key = request.POST.get('api_key', '').strip()
        api_secret = request.POST.get('api_secret', '').strip()
        from_email = request.POST.get('from_email', '').strip()
        from_name = request.POST.get('from_name', 'Sreca').strip()
        is_active = request.POST.get('is_active') == 'on'
        
        # Validation
        if not api_key or not api_secret or not from_email:
            messages.error(request, 'Please fill in all required fields.')
        else:
            # Create or update settings
            if settings:
                settings.api_key = api_key
                settings.api_secret = api_secret
                settings.from_email = from_email
                settings.from_name = from_name
                settings.is_active = is_active
                settings.save()
                messages.success(request, 'Mailjet settings updated successfully!')
            else:
                # Deactivate any existing settings
                MailjetSettings.objects.filter(is_active=True).update(is_active=False)
                
                # Create new settings
                MailjetSettings.objects.create(
                    api_key=api_key,
                    api_secret=api_secret,
                    from_email=from_email,
                    from_name=from_name,
                    is_active=is_active
                )
                messages.success(request, 'Mailjet settings saved successfully!')
            
            # Refresh settings
            settings = MailjetSettings.get_active_settings()
    
    context = {
        'settings': settings
    }
    return render(request, 'account/mailjet_setup.html', context)


def user_list(request):
    """
    Template view to display list of all users
    """
    users = User.objects.all().order_by('-date_joined')
    context = {
        'users': users
    }
    return render(request, 'account/user_list.html', context)


def user_details(request, user_id):
    """
    Template view to display user details
    """
    try:
        user = User.objects.get(id=user_id)
        profile = None
        try:
            profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            pass
        
        context = {
            'user': user,
            'profile': profile
        }
        return render(request, 'account/user_details.html', context)
    except User.DoesNotExist:
        from django.http import Http404
        raise Http404("User not found")


@csrf_exempt
def get_profile_api(request):
    """
    API endpoint to get user profile
    Requires user to be authenticated (email in request)
    """
    # Handle CORS preflight
    if request.method == 'OPTIONS':
        response = JsonResponse({})
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response
    
    if request.method != 'GET':
        return json_response_cors({
            'success': False,
            'message': 'Method not allowed'
        }, status=405)
    
    try:
        # Get user_id from query parameters
        user_id = request.GET.get('user_id', '').strip()
        
        if not user_id:
            return json_response_cors({
                'success': False,
                'message': 'User ID is required'
            }, status=400)
        
        try:
            user_id = int(user_id)
        except ValueError:
            return json_response_cors({
                'success': False,
                'message': 'Invalid user ID'
            }, status=400)
        
        # Get user
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return json_response_cors({
                'success': False,
                'message': 'User not found'
            }, status=404)
        
        # Get or create profile
        profile, created = UserProfile.objects.get_or_create(user=user)
        
        # Get image URL
        image_url = None
        if profile.profile_image:
            image_url = request.build_absolute_uri(profile.profile_image.url)
        
        # Return profile data
        profile_data = {
            'full_name': profile.full_name or user.first_name or '',
            'email': user.email,
            'date_of_birth': profile.date_of_birth.strftime('%Y-%m-%d') if profile.date_of_birth else '',
            'gender': profile.gender or '',
            'city': profile.city or '',
            'area': profile.area or '',
            'street_address': profile.street_address or '',
            'phone': profile.phone or '',
            'alternate_phone': profile.alternate_phone or '',
            'instructions': profile.delivery_instructions or '',
            'profile_image': image_url,
        }
        
        return json_response_cors({
            'success': True,
            'profile': profile_data
        })
        
    except Exception as e:
        return json_response_cors({
            'success': False,
            'message': str(e)
        }, status=500)


@csrf_exempt
def update_profile_api(request):
    """
    API endpoint to update user profile
    Requires user to be authenticated and can only update their own profile
    """
    # Handle CORS preflight
    if request.method == 'OPTIONS':
        response = JsonResponse({})
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response
    
    if request.method != 'POST':
        return json_response_cors({
            'success': False,
            'message': 'Method not allowed'
        }, status=405)
    
    try:
        # Handle both JSON and FormData (multipart/form-data)
        if request.content_type and 'multipart/form-data' in request.content_type:
            # FormData (file upload)
            data = request.POST
            
            # Get user_id - handle both string and int (FormData usually sends strings)
            user_id_raw = data.get('user_id', '')
            if isinstance(user_id_raw, str):
                user_id = user_id_raw.strip()
            elif isinstance(user_id_raw, int):
                user_id = str(user_id_raw)
            else:
                user_id = ''
            
            # Get email
            email_raw = data.get('email', '')
            if isinstance(email_raw, str):
                email = email_raw.strip()
            else:
                email = ''
            
            # Get authenticated_user_id - handle both string and int
            authenticated_user_id_raw = data.get('authenticated_user_id', '')
            if isinstance(authenticated_user_id_raw, str):
                authenticated_user_id = authenticated_user_id_raw.strip()
            elif isinstance(authenticated_user_id_raw, int):
                authenticated_user_id = str(authenticated_user_id_raw)
            else:
                authenticated_user_id = ''
            
            # SECURITY CHECK: Verify authenticated user ID is provided
            if not authenticated_user_id or authenticated_user_id == '':
                return json_response_cors({
                    'success': False,
                    'message': 'Authentication required. Please login again.'
                }, status=401)
            
            try:
                authenticated_user_id = int(authenticated_user_id)
            except (ValueError, TypeError):
                return json_response_cors({
                    'success': False,
                    'message': 'Invalid authentication data'
                }, status=401)
            
            # Get user by user_id (preferred) or email
            try:
                if user_id:
                    try:
                        user_id = int(user_id)
                        user = User.objects.get(id=user_id)
                    except (ValueError, User.DoesNotExist):
                        return json_response_cors({
                            'success': False,
                            'message': 'Invalid user ID'
                        }, status=400)
                elif email:
                    user = User.objects.get(email=email)
                else:
                    return json_response_cors({
                        'success': False,
                        'message': 'User ID or email is required'
                    }, status=400)
            except User.DoesNotExist:
                return json_response_cors({
                    'success': False,
                    'message': 'User not found'
                }, status=404)
            
            # SECURITY CHECK: Verify that authenticated user can only update their own profile
            if authenticated_user_id != user.id:
                return json_response_cors({
                    'success': False,
                    'message': 'You are not authorized to update this profile'
                }, status=403)
            
            # Get or create profile
            profile, created = UserProfile.objects.get_or_create(user=user)
            
            # Handle image upload
            if 'profile_image' in request.FILES:
                profile.profile_image = request.FILES['profile_image']
            
            # Update profile fields
            if 'full_name' in data:
                full_name = data.get('full_name', '').strip()
                profile.full_name = full_name
                if full_name:
                    user.first_name = full_name
                    user.save()
            
            if 'date_of_birth' in data:
                dob = data.get('date_of_birth', '').strip()
                if dob:
                    try:
                        from datetime import datetime
                        profile.date_of_birth = datetime.strptime(dob, '%Y-%m-%d').date()
                    except ValueError:
                        pass
            
            if 'gender' in data:
                profile.gender = data.get('gender', '').strip()
            
            if 'city' in data:
                profile.city = data.get('city', '').strip()
            
            if 'area' in data:
                profile.area = data.get('area', '').strip()
            
            if 'street_address' in data:
                profile.street_address = data.get('street_address', '').strip()
            
            if 'phone' in data:
                profile.phone = data.get('phone', '').strip()
            
            if 'alternate_phone' in data:
                profile.alternate_phone = data.get('alternate_phone', '').strip()
            
            if 'instructions' in data:
                profile.delivery_instructions = data.get('instructions', '').strip()
            
            profile.save()
        else:
            # JSON data (no file upload)
            data = json.loads(request.body)
            
            # Get user_id - handle both string and int
            user_id_raw = data.get('user_id', '')
            if isinstance(user_id_raw, str):
                user_id = user_id_raw.strip()
            elif isinstance(user_id_raw, int):
                user_id = str(user_id_raw)
            else:
                user_id = ''
            
            # Get authenticated_user_id - handle both string and int
            authenticated_user_id_raw = data.get('authenticated_user_id', '')
            if isinstance(authenticated_user_id_raw, str):
                authenticated_user_id = authenticated_user_id_raw.strip()
            elif isinstance(authenticated_user_id_raw, int):
                authenticated_user_id = str(authenticated_user_id_raw)
            else:
                authenticated_user_id = ''
            
            if not user_id:
                return json_response_cors({
                    'success': False,
                    'message': 'User ID is required'
                }, status=400)
            
            # SECURITY CHECK: Verify authenticated user ID is provided
            if not authenticated_user_id:
                return json_response_cors({
                    'success': False,
                    'message': 'Authentication required. Please login again.'
                }, status=401)
            
            try:
                user_id = int(user_id)
                authenticated_user_id = int(authenticated_user_id)
            except (ValueError, TypeError):
                return json_response_cors({
                    'success': False,
                    'message': 'Invalid user ID or authentication data'
                }, status=400)
            
            # Get user
            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                return json_response_cors({
                    'success': False,
                    'message': 'User not found'
                }, status=404)
            
            # SECURITY CHECK: Verify that authenticated user can only update their own profile
            if authenticated_user_id != user.id:
                return json_response_cors({
                    'success': False,
                    'message': 'You are not authorized to update this profile'
                }, status=403)
            
            # Get or create profile
            profile, created = UserProfile.objects.get_or_create(user=user)
            
            # Update profile fields
            if 'full_name' in data:
                full_name = data.get('full_name', '').strip()
                profile.full_name = full_name
                # Also update user's first_name
                if full_name:
                    user.first_name = full_name
                    user.save()
            
            if 'date_of_birth' in data:
                dob = data.get('date_of_birth', '').strip()
                if dob:
                    try:
                        from datetime import datetime
                        profile.date_of_birth = datetime.strptime(dob, '%Y-%m-%d').date()
                    except ValueError:
                        pass
            
            if 'gender' in data:
                profile.gender = data.get('gender', '').strip()
            
            if 'city' in data:
                profile.city = data.get('city', '').strip()
            
            if 'area' in data:
                profile.area = data.get('area', '').strip()
            
            if 'street_address' in data:
                profile.street_address = data.get('street_address', '').strip()
            
            if 'phone' in data:
                profile.phone = data.get('phone', '').strip()
            
            if 'alternate_phone' in data:
                profile.alternate_phone = data.get('alternate_phone', '').strip()
            
            if 'instructions' in data:
                profile.delivery_instructions = data.get('instructions', '').strip()
            
            profile.save()
        
        # Get image URL
        image_url = None
        if profile.profile_image:
            image_url = request.build_absolute_uri(profile.profile_image.url)
        
        # Return updated profile data
        profile_data = {
            'full_name': profile.full_name or user.first_name or '',
            'email': user.email,
            'date_of_birth': profile.date_of_birth.strftime('%Y-%m-%d') if profile.date_of_birth else '',
            'gender': profile.gender or '',
            'city': profile.city or '',
            'area': profile.area or '',
            'street_address': profile.street_address or '',
            'phone': profile.phone or '',
            'alternate_phone': profile.alternate_phone or '',
            'instructions': profile.delivery_instructions or '',
            'profile_image': image_url,
        }
        
        return json_response_cors({
            'success': True,
            'message': 'Profile updated successfully',
            'profile': profile_data
        })
        
    except json.JSONDecodeError:
        return json_response_cors({
            'success': False,
            'message': 'Invalid JSON data'
        }, status=400)
    except Exception as e:
        # Log the full error for debugging
        import traceback
        logger.error(f'Error in update_profile_api: {str(e)}\n{traceback.format_exc()}')
        return json_response_cors({
            'success': False,
            'message': f'An error occurred while updating profile: {str(e)}'
        }, status=500)
