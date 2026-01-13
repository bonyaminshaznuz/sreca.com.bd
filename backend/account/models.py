from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import random
import string

# Create your models here.

class MailjetSettings(models.Model):
    """Store Mailjet API credentials dynamically"""
    api_key = models.CharField(max_length=255)
    api_secret = models.CharField(max_length=255)
    from_email = models.EmailField(default='contact@shaznuz.com')
    from_name = models.CharField(max_length=255, default='Sreca')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Mailjet Settings"
        verbose_name_plural = "Mailjet Settings"

    def __str__(self):
        return f"Mailjet Settings ({self.from_email})"

    @classmethod
    def get_active_settings(cls):
        """Get active Mailjet settings"""
        return cls.objects.filter(is_active=True).first()


class PasswordResetOTP(models.Model):
    """Store OTP for password reset"""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    email = models.EmailField()
    otp = models.CharField(max_length=6)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    class Meta:
        verbose_name = "Password Reset OTP"
        verbose_name_plural = "Password Reset OTPs"
        ordering = ['-created_at']

    def __str__(self):
        return f"OTP for {self.email}"

    @staticmethod
    def generate_otp():
        """Generate a 6-digit OTP"""
        return ''.join(random.choices(string.digits, k=6))

    def is_expired(self):
        """Check if OTP has expired"""
        return timezone.now() > self.expires_at

    def is_valid(self):
        """Check if OTP is valid (not expired and not verified)"""
        return not self.is_expired() and not self.is_verified


class UserProfile(models.Model):
    """Extended user profile information"""
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    full_name = models.CharField(max_length=255, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True)
    city = models.CharField(max_length=100, blank=True)
    area = models.CharField(max_length=100, blank=True)
    street_address = models.TextField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    alternate_phone = models.CharField(max_length=20, blank=True)
    delivery_instructions = models.TextField(blank=True)
    profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "User Profile"
        verbose_name_plural = "User Profiles"

    def __str__(self):
        return f"Profile of {self.user.email}"
