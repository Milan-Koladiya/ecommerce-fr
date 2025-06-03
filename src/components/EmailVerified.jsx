import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showAlert } from '../redux/slice/alertSlice';
import AlertMessage from './AlertMessage';

const Verified = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const verifyEmail = async () => {
            const emailToken = new URLSearchParams(window.location.search).get('token');
            if (!emailToken) {
                dispatch(showAlert({ message: 'Token is missing.', type: 'error' }));
                return;
            }

            try {
                const res = await fetch('http://localhost:5500/auth/emailverify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token: emailToken }),
                });

                const data = await res.json();

                if (res.ok) {
                    dispatch(showAlert({ message: data.message, type: 'success' }));
                    setTimeout(() => {
                        navigate('/auth/login');
                    }, 1000);
                } else {
                    dispatch(showAlert({ message: data.message, type: 'error' }));
                }
            } catch (error) {
                dispatch(showAlert({ message: 'An error occurred. Please try again.', type: 'error' }));
            }
        };

        verifyEmail();
    }, [dispatch, navigate]);

    return (
        <div>
            <AlertMessage />
        </div>
    );
};

export default Verified;
