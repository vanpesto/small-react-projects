import React,{useState,useRef} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { FaCamera } from 'react-icons/fa'
function Account() {
 
    const [error,setError] = useState()
    const history = useHistory()
    const fileButtonBg = useRef()
    const fileButtonProfile = useRef()
    const { logout,userData,prepareImageForUpload } = useAuth()

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
            <input id="fileButtonBg" type="file" ref={fileButtonBg} onChange={(e)=>prepareImageForUpload(e,"userBgImg","fileButtonBg")} style={{display:'none'}}/>
            <input id="fileButtonProfile" type="file" ref={fileButtonProfile} onChange={(e)=>prepareImageForUpload(e,"userImage","fileButtonProfile")} style={{display:'none'}}/>
            {error && <p>{error}</p>}
          

             <div className="user-bg-img">
             {userData.userBgImg && <img src={userData.userBgImg} alt="background-img"/>}
             <button className={`user-change-bg-btn ${!userData.userBgImg && 'no-bg'}`} onClick={()=>fileButtonBg.current.click()}><p><FaCamera/></p> Background Image</button>
            </div>
           
            <div className="user-image" onClick={()=>fileButtonProfile.current.click()}>
                <span><FaCamera/></span>
                <img src={userData.userImage} alt="user img"/>
            </div>
            <p className="account-username">{userData.username}</p>
            <Link className="profile-update-btn" to='updateProfile'>Update Profile</Link>
            <button  className="logout-btn" onClick={handleLogout}>Log Out</button>
        </div>
        </div>
    )
}

export default Account
