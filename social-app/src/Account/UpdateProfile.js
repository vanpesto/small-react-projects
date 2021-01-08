import React,{useRef, useState} from 'react'
import './Account.css'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from './AuthContext'

 function UpdateProfile() {

    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    
    const { currentUser, updateEmail, updatePassword, updateUsername, userData,loading } = useAuth()
    const [error, setError] = useState('')
    const history = useHistory()

     const  handleSubmit = async (e) =>{
        e.preventDefault()

        if(passwordRef.current.value !== confirmPasswordRef.current.value){
            return setError('Passwords do not match')
        }

        const promises = []
        if(emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }
        if(usernameRef.current.value){
            promises.push(await updateUsername(usernameRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push('/account')
        }).catch(()=>{
            setError('Failed to update account')
        })
       
    }
    return (
        <div className="account">
            <div className="account-auth-container">
            <h3>Update Profile</h3>
            {error && <p className="form-error">{error}</p>}
            <form className="account-form" onSubmit={handleSubmit}>
            <div className="input-container">
                    <label>Username</label>
                    <input type="text" placeholder="email" ref={usernameRef} defaultValue={userData.username}/>
                </div>
                <div className="input-container">
                    <label>Email</label>
                    <input type="text" placeholder="email" ref={emailRef} defaultValue={currentUser.email}/>
                </div>
                <div className="input-container">
                    <label>Password</label>
                    <input type="password" ref={passwordRef} placeholder="Leave blank to keep the same"/>
                </div>
                <div className="input-container">
                    <label>Confirm Password</label>
                    <input type="password" ref={confirmPasswordRef} placeholder="Leave blank to keep the same"/>
                </div>
                <button disabled={loading} className="form-btn" type="submit" >Update</button>
            </form>
            <div className="acc-link">
                <Link className="link" to='/account'>Cancel</Link>
            </div>
            </div>
        </div>
    )
}

export default UpdateProfile
  