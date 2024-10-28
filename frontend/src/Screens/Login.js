import React, { useState} from 'react';
import '../Styles/Login.css';
import { validateEmail,validatePassword } from '../Utils/formValidation';
import { loginUser } from '../Utils/loginApiService';
import InputField from '../Components/InputField';
import { useNotification } from '../Utils/NotificationContext';
import { useDispatch } from 'react-redux';
import { setUser } from '../Utils/Store';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const dispatch = useDispatch();
    const navigate=useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const {showNotification}=useNotification();


    const submitHandler = async (e) => {
        e.preventDefault();

        // Validation
        const emailValidationError = validateEmail(email);
        const passwordValidationError = validatePassword(password);

        setEmailError(emailValidationError);
        setPasswordError(passwordValidationError);

        if (emailValidationError || passwordValidationError) {
            return; 
        }
        const body = {email, password };
        
        try {
            const response = await loginUser(body);
            showNotification(response.message,'success');
            setEmail('');
            setPassword('');    
            const {message,...userData}=response;
            const modifiedUserData={...userData,isAuthenticated:true};
            dispatch(setUser(modifiedUserData)); 

            setTimeout(() => { 
                navigate('/dashboard');
            }, 3000);
        } catch (error) {
            showNotification(error.message,'error');
            console.log(error);
        }
    };

   return (
    <div className='page-container'>
    <section className='container'>
        <div className='login-image-container'>
            <div className='login-image'>
                <img src='/images/login_page_img.jpg' alt='login' />
            </div>
        </div>

        <div className='login-form-container'>
            <div className='form-header'>
                <div className="title-container">
                    <h1 className="title">
                        <span className="project">Project</span>
                        <span className="flow">Flow</span>
                        <span className="finder">Finder</span>
                    </h1>
                </div>
                <p>Login to Continue</p>
            </div>

            <div className='form-body'>
                <form onSubmit={submitHandler} method='POST'>
                    <InputField 
                        label='Email' 
                        type='email' 
                        id='email' 
                        name='email' 
                        placeholder='Enter email' 
                        value={email} 
                        onChange={(e) =>{setEmail(e.target.value);
                        setEmailError(validateEmail(e.target.value));
                        }} 
                        errorMessage={emailError} 
                    />

                    <InputField 
                        label='Password' 
                        type='password' 
                        id='password' 
                        name='password' 
                        placeholder='Enter password' 
                        value={password} 
                        onChange={(e) =>{setPassword(e.target.value);
                        setPasswordError(validatePassword(e.target.value));
                        }} 
                        errorMessage={passwordError} 
                        showPasswordToggle={true} 
                        showPassword={showPassword} 
                        showForgotPassword={true}
                        onTogglePassword={() => setShowPassword(!showPassword)} 
                    />

                    <div className='form-button'>
                        <button type='submit'>
                            <span>Login</span>
                        </button>
                    </div>
                </form>
            </div>

            <div className='form-footer'>
                <p><span>__________</span> Or Continue with <span>__________</span></p>
                <div className='social-logins'>
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
                <p className='navigatelink'>Don't have an account? <a href='/authentication/signup'> Create an Account </a> here</p>
            </div>
        </div>
    </section>        
</div>
);
}

