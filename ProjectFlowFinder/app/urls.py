from django.urls import path
from .views import RegisterView, LoginView, LogoutView, UserDetails, PasswordChangeView, OTPSendView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('userdetails/', UserDetails.as_view(), name='userdetails'),
    path('otp-send/', OTPSendView.as_view(), name='otp-send'),
    path('password-change/', PasswordChangeView.as_view(), name='password-change'),
]
