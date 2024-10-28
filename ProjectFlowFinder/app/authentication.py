# authentication.py
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .models import User  # Ensure this is the correct import

class CustomAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_headers = request.headers.get('Authorization')
        if not auth_headers:
            return None
        auth_parts = auth_headers.split(' ')
        if len(auth_parts) != 2:
            raise AuthenticationFailed('Invalid Authorization header format')
        token_type, token_value = auth_parts
        if token_type.lower() == 'bearer':
            return self._authentication_access_token(token_value)
        elif token_type.lower() == 'apikey':
            return self._authentication_apikey(token_value)
        raise AuthenticationFailed('Invalid token type')

    def _authentication_access_token(self, token_value):
        try:
            access_token = AccessToken(token_value)
            user_id = access_token['user_id']
            user = User.objects.get(id=user_id)
            return (user, None)
        except Exception as e:
            raise AuthenticationFailed('Invalid token')

    def _authentication_apikey(self, token_value):
        try:
            user = User.objects.get(api_key=token_value)
            return (user, None)
        except User.DoesNotExist:
            raise AuthenticationFailed('Invalid API key')
