// GoogleLoginComponent.js
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

const GoogleLoginComponent = () => {
  const handleSuccess = (response) => {
    const { tokenId } = response;

    // Step 1: Send the Google token to the backend
    axios.post('http://localhost:8000/auth/google/', {
      token: tokenId,
    })
    .then(res => {
      const { access_token, refresh_token } = res.data;
      
      // Step 2: Store access_token and refresh_token in localStorage
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      console.log("Logged in successfully:", res.data);
    })
    .catch(err => {
      console.error("Login failed", err);
    });
  };

  const handleFailure = (response) => {
    console.error("Google login failed", response);
  };

  return (
    <div>
      <GoogleLogin
        clientId="your-google-client-id"
        buttonText="Login with Google"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default GoogleLoginComponent;
