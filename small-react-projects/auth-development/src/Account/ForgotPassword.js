import React,{useRef, useState} from 'react'
import { useAuth } from './AuthContext'
import { Link } from 'react-router-dom'
 function ForgotPassword() {

    const emailRef = useRef()

    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message,setMessage] = useState("")

    const  handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check your email for further instructions")
        }catch{
            setError('Failed to reset password')
        }
        setLoading(false)
    }
    return (
        <div className="account">
            <div className="account-container">
            <h3>Password Rest</h3>
            {error && <p className="form-error">{error}</p>}
            {message && <p className="account-message">{message}</p>}
            <form className="account-form" onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Email</label>
                    <input type="text" placeholder="email" ref={emailRef} required/>
                </div>
              
                <button disabled={loading} className="form-btn" type="submit" >Reset Password</button>
                <Link className="acc-link" to='/login'>Login</Link>
            </form>
            <div className="acc-link">
                Need an account?<Link to="/signup">Sign up</Link>
            </div>
            </div>
        </div>
    )
}

export default ForgotPassword
  