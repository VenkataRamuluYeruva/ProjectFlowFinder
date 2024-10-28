// MessageBox.js
import React from 'react';
import '../Styles/Notification.css';
import { useNotification } from '../Utils/NotificationContext';

const Notification = () => {
    const {notification,clearNotification}=useNotification();
    if (!notification) {
        return null;
    }
    return (

        <div className={`notification ${notification.type}`} onClick={clearNotification}>
            <span className="material-icons" 
                style={{ color: notification.type === 'success' ? 'green' : 'darkred' }}>
                    {notification.type==='success'?'check_circle':'error'}
            </span>
            <span>{notification.message}</span>
        </div>
    );
};

export default Notification;
