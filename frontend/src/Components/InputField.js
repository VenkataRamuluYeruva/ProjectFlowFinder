// InputField.js
import React from 'react';
import '../Styles/Login.css'; 
import { Link } from 'react-router-dom';

const InputField = ({
    label,
    type,
    id,
    name,
    placeholder,
    value,
    onChange,
    errorMessage,
    showPasswordToggle = false,
    showPassword,
    showForgotPassword =false,
    onTogglePassword,
}) => {
    return (
        <div className='form-group'>
            <div className='form-box'>
                <label htmlFor={id}>{label}</label>
                <input 
                    type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type} 
                    id={id} 
                    name={name} 
                    placeholder={placeholder} 
                    value={value} 
                    onChange={onChange} 
                />
            </div>
            {errorMessage && <div className='field-error'>
                <p>{errorMessage}</p>
            </div>}
            {showPasswordToggle && (
                <div className='password-container'>
                    <div className='show-password'>
                        <input 
                            type='checkbox' 
                            id={`show-${id}`} 
                            name={`show-${name}`} 
                            onChange={onTogglePassword} 
                        />
                        <label htmlFor={`show-${id}`}>Show Password</label>
                    </div>
                    {showForgotPassword && <div className='forgot-password'>
                        <span className='a'><Link to='/forgot-password'>Forgot Password?</Link></span>
                    </div>}
                </div>
            )}
        </div>
    );
};

export default InputField;
