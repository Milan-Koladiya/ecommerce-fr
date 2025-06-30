import React, { useState,useEffect } from 'react'
import VerifyEmail from '../../views/auth/VerifyEmail'
import { Navigate } from 'react-router-dom'
import useAuthentication from '../../hooks/useAuthentication'
import Loader from '../../components/common/loader'


const VerifyEmailPage = () => {
    
    const token= new URLSearchParams(window.location.search).get('token');
    const { verifyEmail, message, error } = useAuthentication()
    const [isValid, setIsValid] = useState<boolean>()

    useEffect(() => {
        const verifyEmailToken = async () => {
            try {
                await verifyEmail({token})
                setIsValid(true)
            }
            catch (error) {
                console.log(`error in email verification ${error}`)
                setIsValid(false)
            }
        }
        verifyEmailToken()

    }, [token])

    if (isValid === null) return <Loader />

    if (error && message) return <Navigate to={'/login'} />

    return (
        <React.Fragment>
            <VerifyEmail message={message} />
        </React.Fragment>
    )
}

export default VerifyEmailPage
