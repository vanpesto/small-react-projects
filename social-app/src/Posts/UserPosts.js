import React from 'react'
import { useAuth } from '../Account/AuthContext'
import UserPost from './UserPost'

function UserPosts() {
    const { posts } = useAuth()
   
    return (
        <div className="allposts-container">
             {posts.map((item)=>{
                return <UserPost key={item.postId} {...item}/>
            })}
        </div>
    )
}

export default UserPosts
