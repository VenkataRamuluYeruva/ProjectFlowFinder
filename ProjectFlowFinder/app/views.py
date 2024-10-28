from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.hashers import make_password, check_password
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User  # Ensure this is the correct import
from .authentication import CustomAuthentication  # Import the custom authentication class here
import uuid 
from .mailsend import send_otp_email
from .serializers import UserSerializer

# Helper function to create API Key
def generate_api_key():
    return str(uuid.uuid4())  # Generates a unique API key

# Register View
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if User.objects.filter(email=email).exists():
            return Response({'message': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        api_key = generate_api_key()  # Generate API key
        user = User(
            username=username,
            email=email,
            password=make_password(password),
            api_key=api_key  # Save API key in the user table
        )
        user.save()

        return Response({'message': 'User Registered Successfully', 'api_key': api_key}, status=status.HTTP_201_CREATED)

# Login View
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = User.objects.get(email=email)
            if check_password(password, user.password):
                refresh = RefreshToken.for_user(user)
                return Response({
                    'message': 'Login Successful',
                    'api_key': user.api_key,
                    'access_token': str(refresh.access_token),
                    'refresh_token': str(refresh)
                }, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Invalid Password'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)

# Logout View
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh_token')
            token = RefreshToken(refresh_token)
            token.blacklist()  # Blacklist the refresh token
            return Response({'message': 'Logout Successful'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': 'Logout Failed', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

#UserDetails View
class UserDetails(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        Authorization= request.headers.get('Authorization').split()
        api_key=Authorization[1]# Debugging line

        if not api_key:
            return Response({'message': 'API Key not found'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(api_key=api_key)
            user_data=UserSerializer(user).data
            return Response({'user': user_data}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        

# Password Reset View
class OTPSendView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        user = User.objects.filter(email=email).first()
        if user:
            otp = send_otp_email(email)
            api_key = user.api_key
            return Response({'message': 'OTP sent to email', 'otp': otp, 'api_key': api_key}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


# Password Reset Confirm View
class PasswordChangeView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        apikey = request.data.get('apikey')
        new_password = request.data.get('new_password')
        try:
            user = User.objects.get(api_key=apikey)
            user.password=make_password(new_password)  # Proper way to set the password
            user.save()  # Save the updated user object
            return Response({'message': 'Password Reset Successful'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
            
