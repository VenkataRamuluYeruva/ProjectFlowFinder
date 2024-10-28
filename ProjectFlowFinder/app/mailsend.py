import random
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from datetime import timedelta

# Generate a random 6-digit OTP
def generate_otp():
    return str(random.randint(100000, 999999))

# Function to send OTP to user's email
def send_otp_email(email):
    otp = generate_otp()

    send_mail(
        'Password Reset OTP',
        f'Your OTP for password reset is: {otp}',
        settings.EMAIL_HOST_USER,
        [email],
        fail_silently=False,
    )

    return otp
