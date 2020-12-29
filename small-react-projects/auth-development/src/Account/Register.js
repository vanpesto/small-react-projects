import React,{useRef, useState} from 'react'
import './Account.css'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from './AuthContext'

 function Register() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [message,setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const  handleSubmit = async (e) =>{
        e.preventDefault()

        if(passwordRef.current.value !== confirmPasswordRef.current.value){
            return setError('Passwords do not match')
        }
        try{
            setMessage('')
            setError('')
            setLoading(true)
            await signup(emailRef.current.value,passwordRef.current.value)
            setMessage('Your account has been created successfully!')
            setTimeout(()=>{
                history.push('/')
            },1000 )
        }catch{
            setError('Failed to create an account')
        }
        
        setLoading(false)
    }
    return (
        <div className="account">
            <div className="account-container">
            <h3>Sign Up</h3>
            {error && <p className="form-error">{error}</p>}
            {message && <p className="account-message">{message}</p>}
            <form className="account-form" onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Email</label>
                    <input type="text" placeholder="email" ref={emailRef} required/>
                </div>
                <div className="input-container">
                    <label>Password</label>
                    <input type="password" placeholder="password" ref={passwordRef} required/>
                </div>
                <div className="input-container">
                    <label>Confirm Password</label>
                    <input type="password" placeholder="confirm password" ref={confirmPasswordRef} required/>
                </div>
                <button disabled={loading} className="form-btn" type="submit" >Register</button>
            </form>
            <div className="acc-link">
                Already have an account? <Link to='/login'> Log In</Link>
            </div>
            </div>
        </div>
    )
}

export default Register
  