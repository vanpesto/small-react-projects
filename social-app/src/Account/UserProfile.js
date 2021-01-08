import React,{useEffect,useState} from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'
import firebase from 'firebase'
import Loading from './Loading'

function UserProfile() {
    
    const [ loading,setLoading ] = useState()
    const [user,setUser] = useState("")
    const location = useLocation()

    const history = useHistory()
    var id = location.state
    useEffect(() => {
        if(!id){
            history.push("/")
        }
        getUserData()
    }, []) 
    function getUserData() {
        setLoading(true)
                    firebase.database().ref(`users/${id}`).once("value").then(function(snapshot) { 
                    setUser(snapshot.exportVal())
            }).then(()=>{
                    setLoading(false)
            })
       
    }

        return (
            <div className="account">
                {loading && <Loading/>}
            
            <div className="account-container">
                 <div className="user-bg-img">
                 {user.userBgImg && <img src={user.userBgImg} alt="background-img"/>}
                </div>
                <div className="user-image">
                    <img src={user.userImage} alt="user img"/>
                </div>
                <p className="account-username">{user.username}</p>
            </div>
            </div>
        )
 
}

export default UserProfile
