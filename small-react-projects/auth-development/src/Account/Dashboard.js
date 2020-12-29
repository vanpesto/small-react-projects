import React,{useState} from 'react'
import { useAuth } from './AuthContext'
import { Link, useHistory } from 'react-router-dom'
function Dashboard() {

    const [error,setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function  handleLogout() {
        setError('')
        try{
            await logout()
            history.pushState('/login')
        }catch{
            setError('Failed to log out')
        }
    }
    return (
        <div className="account">
            <div className="account-container">
                {error && <p>{error}</p>}
                <h3>Profile</h3>
                <p className="profile-email"><span style={{fontWeight:"900"}}>Email:</span> { currentUser.email }</p>
                <Link className="profile-update-btn" to='updateProfile'>Update Profile</Link>
                <button  className="logout-btn" onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    )
}

export default Dashboard
