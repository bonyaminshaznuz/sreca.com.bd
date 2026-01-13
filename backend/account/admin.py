from django.contrib import admin
from .models import MailjetSettings, PasswordResetOTP, UserProfile

# Register your models here.

@admin.register(MailjetSettings)
class MailjetSettingsAdmin(admin.ModelAdmin):
    list_display = ('from_email', 'from_name', 'is_active', 'created_at', 'updated_at')
    list_editable = ('is_active',)
    fieldsets = (
        ('API Credentials', {
            'fields': ('api_key', 'api_secret')
        }),
        ('Email Settings', {
            'fields': ('from_email', 'from_name')
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
    )


@admin.register(PasswordResetOTP)
class PasswordResetOTPAdmin(admin.ModelAdmin):
    list_display = ('email', 'otp', 'is_verified', 'created_at', 'expires_at', 'is_expired_display')
    list_filter = ('is_verified', 'created_at')
    readonly_fields = ('created_at', 'expires_at', 'is_expired_display')
    search_fields = ('email', 'otp')
    
    def is_expired_display(self, obj):
        return obj.is_expired()
    is_expired_display.boolean = True
    is_expired_display.short_description = 'Expired'


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'full_name', 'phone', 'city', 'updated_at')
    list_filter = ('gender', 'city', 'created_at')
    search_fields = ('user__email', 'full_name', 'phone')
    readonly_fields = ('created_at', 'updated_at')
