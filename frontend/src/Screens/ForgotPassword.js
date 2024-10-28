import React, { useState } from 'react';
import '../Styles/ForgotPassword.css';
import { useNavigate } from 'react-router-dom';
import InputField from '../Components/InputField';
import { validateEmail } from '../Utils/formValidation';
import axios from 'axios';
import {useNotification} from '../Utils/NotificationContext';

const ForgotPassword = () => {
    const {showNotification} = useNotification();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [apikey, setApikey] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        const emailError = validateEmail(email);
        if (emailError) {
            setEmailError(emailError);
            return;
        }
        
        try {
            const response = await axios.post('http://localhost:8000/auth/otp-send/', { email }); 
            setGeneratedOtp(response.data.otp);
            showNotification('OTP has been sent to your email.','success');
            setApikey(response.data.api_key);
            setOtpSent(true); 
        } catch (error) {
            console.error(error); 
            showNotification('OTP sent to your email failed', 'error');
        }
    };
    

    const ResendOtp = () => {
        // Implement OTP generation logic here
        alert('OTP has been sent to your email.');
    }
    const handleOtpSubmit = (e) => {
        e.preventDefault();
        if (otp === generatedOtp) {
            navigate(`/authentication/password-reset/${apikey}`);
        } else {
            showNotification('Invalid OTP', 'error');
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
                            <p>Reset your password</p>
                        </div>
                    </div>
                    <div className="form-body">
                        {!otpSent ? (
                            <form onSubmit={handleEmailSubmit}>
                                <InputField
                                    label="Email"
                                    type="email"
                                    id="email"
                                    name='email'
                                    placeholder="Enter your email"
                                    value={email}
                                    errorMessage={emailError}
                                    onChange={(e) =>{setEmail(e.target.value);
                                        setEmailError(validateEmail(e.target.value));
                                    }}
                                    
                                />
                                <div className="form-button">
                                    <button type="submit">
                                        <span>Get OTP</span>
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleOtpSubmit}>
                                <div className="form-group">
                                    <div className="form-box">
                                        <label>Enter OTP</label>
                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                        />
                                    </div>
                                    <div className='submit' onClick={()=>ResendOtp()}>
                                        <span>Resend OTP</span>
                                    </div>
                                </div>
                                <div className="form-button">
                                    <button type="submit">
                                        <span>Continue</span>
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
