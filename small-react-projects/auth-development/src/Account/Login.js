import React,{useRef, useState} from 'react'
import { useAuth } from './AuthContext'
import { Link, useHistory } from 'react-router-dom'
 function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const  handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            setError('')
            setLoading(true)
            await login(emailRef.current.value,passwordRef.current.value)
            history.push('/')
        }catch{
            setError('Wrong username or password')
        }
        setLoading(false)
    }
    return (
        <div className="account">
            <div className="account-container">
            <h3>Log In</h3>
            {error && <p className="form-error">{error}</p>}
            <form className="account-form" onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Email</label>
                    <input type="text" placeholder="email" ref={emailRef}/>
                </div>
                <div className="input-container">
                    <label>Password</label>
                    <input type="password" placeholder="password" ref={passwordRef}/>
                </div>
                <button disabled={loading} className="form-btn" type="submit" >Log In</button>
                <Link className="forgot-password" to='forgotPassword'>Forgot Password</Link>
            </form>
            <div className="acc-link">
                Need an account? <Link to="/signup"> Sign up</Link>
            </div>
            </div>
        </div>
    )
}

export default Login
  