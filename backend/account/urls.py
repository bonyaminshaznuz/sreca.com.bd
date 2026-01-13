from django.urls import path
from . import views

urlpatterns = [
    path('api/signup/', views.signup_api, name='signup_api'),
    path('api/login/', views.login_api, name='login_api'),
    path('api/forgot-password/send-otp/', views.forgot_password_send_otp, name='forgot_password_send_otp'),
    path('api/forgot-password/verify-otp/', views.forgot_password_verify_otp, name='forgot_password_verify_otp'),
    path('api/forgot-password/reset/', views.forgot_password_reset, name='forgot_password_reset'),
    path('api/forgot-password/resend-otp/', views.forgot_password_resend_otp, name='forgot_password_resend_otp'),
    path('api/profile/', views.get_profile_api, name='get_profile_api'),
    path('api/profile/update/', views.update_profile_api, name='update_profile_api'),
    path('mailjet-setup/', views.mailjet_setup, name='mailjet_setup'),
    path('users/', views.user_list, name='user_list'),
    path('users/<int:user_id>/', views.user_details, name='user_details'),
]
