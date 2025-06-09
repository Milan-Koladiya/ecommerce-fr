import React from 'react'
import {Link} from 'react-router-dom'

const VerifyEmail = ({message}) => {
  return (
    <div>
      <div className="d-flex m-10 justify-content-center vh-10 bg-light">
      <div className="m-10 card shadow-lg p-4" style={{ maxWidth: '500px', width: '50%' }}>
        <div className="text-center">

          <h3 className="text-success fw-bold">{message}</h3>
          <p className="text-muted mb-10">
            Your email has been successfully verified.
            You can now go to the login page to access the platform.
          </p>

          <Link to="/login" className="btn btn-primary w-100">
            Go to Login
          </Link>
        </div>
      </div>
    </div>
    </div>
  )
}

export default VerifyEmail
