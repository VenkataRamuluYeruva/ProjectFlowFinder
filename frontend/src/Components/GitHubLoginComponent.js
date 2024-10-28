// GitHubLoginComponent.js
import React from 'react';
import { GithubLoginButton } from 'react-oauth/github';
import axios from 'axios';

const GitHubLoginComponent = () => {
  const handleSuccess = (response) => {
    const { token } = response;

    // Step 1: Send the GitHub token to the backend
    axios.post('http://localhost:8000/auth/github/', {
      token: token,
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
    console.error("GitHub login failed", response);
  };

  return (
    <div>
      <GithubLoginButton
        clientId="your-github-client-id"
        redirectUri="your-redirect-uri"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
      />
    </div>
  );
};

export default GitHubLoginComponent;
