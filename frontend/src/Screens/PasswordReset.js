import React, { useState } from 'react';
import '../Styles/ForgotPassword.css';
import { useParams } from 'react-router-dom';
import { validatePassword } from '../Utils/formValidation';
import axios from 'axios';
import InputField from '../Components/InputField';// Import the MessageBox component
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../Utils/NotificationContext';

const PasswordReset = () => {
    const {showNotification} = useNotification();
    const navigate = useNavigate();
    const { apikey } = useParams();

    const [newpassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    


    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (newpassword === '') {
            setPasswordError('Password is required');
            return;
        }
        if (confirmNewPassword === '') {
            setConfirmPasswordError('ConfirmPassword is required');
            return;
        }
        if (newpassword !== confirmNewPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }
        try {
            console.log(apikey);
            const response = await axios.post('http://localhost:8000/auth/password-change/', { apikey, new_password: newpassword });
            setConfirmNewPassword('');
            setNewPassword('');
            showNotification('Password reset successfully', 'success');

            setTimeout(() => {
                navigate('/login');
            }, 3000);
            
        } catch (error) {
            showNotification('Password reset failed , Please try again', 'error');
            return;
        }
    };

    return (
        <div className="forgotpage-container">
            <div className="container">
                <div className="forgot-password-form-container">
                    <div className="form-header">
                        <div className="title-container">
                            <h2 className="forgot-title">
                                <span className="project">Project</span>
                                <span className="flow">Flow</span>
                                <span className="finder">Finder</span>
                            </h2>
                            <p>Set a new password</p>
                        </div>
                    </div>
                    <div className="form-body">
                        <form onSubmit={handlePasswordSubmit}>
                            <InputField
                                label="New Password"
                                type="password"
                                id="new-password"
                                name="new-password"
                                placeholder="Enter new password"
                                value={newpassword}
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                    setPasswordError(validatePassword(e.target.value));
                                }}
                                errorMessage={passwordError}
                            />
                            <InputField
                                label="Confirm New Password"
                                type="password"
                                id="confirm-new-password"
                                name="confirm-new-password"
                                placeholder="Confirm new password"
                                value={confirmNewPassword}
                                onChange={(e) => {
                                    setConfirmNewPassword(e.target.value);
                                    setConfirmPasswordError(validatePassword(e.target.value));
                                }}
                                errorMessage={confirmPasswordError}
                            />
                            <div className="form-button">
                                <button type="submit">
                                    <span>Save Password</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordReset;
