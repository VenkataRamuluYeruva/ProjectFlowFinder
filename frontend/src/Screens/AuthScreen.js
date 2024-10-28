import React from 'react';
import { Route, Routes,Navigate } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import Signup from './Signup';
import PasswordReset from './PasswordReset';

export default function AuthScreen() {
  return (
    <Routes>
      <Route path="/" element={< Navigate to="/authentication/login" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/password-reset/:email" element={<PasswordReset />} />
    </Routes>
  );
}
