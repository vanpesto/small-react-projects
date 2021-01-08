import React,{useEffect} from 'react'
import { useAuth } from './AuthContext'
import './Posts.css'

import Account from './Account'
import Loading from './Loading'
import WritePost from '../Posts/WritePost'
import UserPosts from '../Posts/UserPosts'
function Dashboard() {

    const {currentUser,loading,fetchUserPosts} = useAuth()

    useEffect(() => {
        fetchUserPosts()
        window.scroll({
            top: 0, 
            left: 0
           })
    }, [])
    

    if(currentUser){
    return (
       
        <div className="profile-page">
           
            {loading && <Loading/>}
            <Account/>
            <WritePost fetchData="myPosts" title="Your Posts" allPostsLink="See all posts"/>
            <UserPosts/>
        </div>
        
    )
    }
}

export default Dashboard
