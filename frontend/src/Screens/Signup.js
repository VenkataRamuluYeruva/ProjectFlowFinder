import React, { useState } from 'react';
import '../Styles/Login.css';
import { validateUsername, validateEmail, validatePassword } from '../Utils/formValidation';
import { registerUser } from '../Utils/registerApi';
import InputField from '../Components/InputField';
import {useNotification} from '../Utils/NotificationContext';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const {showNotification} = useNotification();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [usernameError, setUsernameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();

        // Validation
        const usernameValidationError = validateUsername(username);
        const emailValidationError = validateEmail(email);
        const passwordValidationError = validatePassword(password);

        setUsernameError(usernameValidationError);
        setEmailError(emailValidationError);
        setPasswordError(passwordValidationError);

        if (usernameValidationError || emailValidationError || passwordValidationError) {
            return; 
        }

        const body = { username, email, password };
        
        try {
            const result = await registerUser(body);
            showNotification('User registered successfully', 'success');
            setEmail('');
            setPassword('');
            setUsername('');

            setTimeout(() => {
                navigate('/');
            },3000);
            
        } catch (error) {
            showNotification(error.message, 'error');
            
        }
    };

    return (
        <div className='page-container'>
            <section className='container'>
                <div className='signup-image-container'>
                    <div className='signup-image'>
                        <img src='/images/login_page_img.jpg' alt='signup' />
                    </div>
                </div>
                <div className='signup-form-container'>
                    <div className='form-header'>
                        <div className="title-container">
                            <h1 className="title">
                                <span className="project">Project</span>
                                <span className="flow">Flow</span>
                                <span className="finder">Finder</span>
                            </h1>
                        </div>
                        <p>Create an Account</p>
                    </div>
                    <div className='form-body'>
                        <form onSubmit={submitHandler} method='POST'>
                            <InputField
                                label='Username'
                                type='text'
                                id='username'
                                name='username'
                                placeholder='Enter username'
                                value={username}
                                onChange={(e) =>{setUsername(e.target.value);
                                setUsernameError(validateUsername(e.target.value));
                                }}
                                errorMessage={usernameError}
                            />
                            <InputField
                                label='Email'
                                type='email'
                                id='email'
                                name='email'
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e)=>{setEmail(e.target.value);
                                setEmailError(validateEmail(e.target.value));
                                }}
                                errorMessage={emailError}
                            />
                            <InputField
                                label='Password'
                                type='password'
                                id='password'
                                name='password'
                                placeholder='Enter Password'
                                value={password}
                                onChange={(e) =>{setPassword(e.target.value);
                                setPasswordError(validatePassword(e.target.value));
                                }}
                                errorMessage={passwordError}
                                showPasswordToggle={true}
                                showPassword={showPassword}
                                showForgotPassword={false}
                                onTogglePassword={() => setShowPassword(!showPassword)}
                            />
                            <div className='form-button'>
                                <button type='submit'>
                                    <span>Sign Up</span>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className='form-footer'>
                        <p><span>__________</span> Or Continue with <span>__________</span></p>
                        <div className='social-signups'>
                            <div className='social-signup-button'>
                                <button>
                                    <div className='social-signup-icon'>
                                        <img src='/images/google-icon.png' alt='google' />
                                    </div>
                                    <div className='social-signup-text'>
                                        <span>Sign Up With Google</span>
                                    </div>
                                </button>
                            </div>
                            <div className='social-signup-button'>
                                <button>
                                    <div className='social-signup-icon'>
                                        <img src='/images/github-icon.png' alt='github' />
                                    </div>
                                    <div className='social-signup-text'>
                                        <span>Sign Up With GitHub</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <p className='navigatelink'>Already have an account? <a href='/'> Login </a> here</p>
                    </div>
                </div>
            </section>        
        </div>
    );
}
