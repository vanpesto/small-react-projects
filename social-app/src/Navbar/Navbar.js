import React,{useState,useEffect,useRef} from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { useAuth } from '../Account/AuthContext'
import './Navbar.css'
import { BsArrowRightShort } from 'react-icons/bs'
function Navbar() {

    const {logout,getUserData,userData,currentUser} = useAuth()

    const [scrolled,setScrolled] = useState()
    const [error,setError] = useState('')

    const history = useHistory()
    useEffect(() => {
        window.addEventListener('scroll',handleScroll)
        if(currentUser){
            getUserData(currentUser.uid)
        }
      
    }, [])
    const handleScroll = () => {
        const offset=window.scrollY;
        if(offset > 0 ){
          setScrolled(true);
        }
        else{
          setScrolled(false);
        }
      }   

      async function  handleLogout() {
   
        try{
            
            await logout()
            history.push("/login")
           
        }catch{
            setError('Failed to log out')
        }
    }
    return (
        <div className={`social-nav ${scrolled && 'nav-fixed'}`}>
    
            <Link to="/" className="social-nav-title">Social App</Link>
            {error && alert(error)}
           
            {userData.email ? 
                <div className="social-nav-user">
                <Link to="/account" className="social-nav-user-details">
                    <p className="go-to">Go To <BsArrowRightShort/></p>
                    <div className="social-nav-user-img user-img-bg">
                        <img src={userData.userImage} alt="" onClick={()=><Redirect to="/"/>}/>
                    </div>
                    <h2 className="social-nav-username">{userData.username}</h2>
                   
                   
                    </Link>
                     <button className="link logout" onClick={handleLogout}>Log Out</button>
                     </div>
                :
             
                <div className="social-nav-btn-container">
                     
                    <Link to='/login' className="link login">Log In</Link>
                    <Link to='/signup' className="link signup">Sign Up</Link>
                </div>
                }
        </div>
    )
}

export default Navbar
