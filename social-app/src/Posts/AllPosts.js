import React,{useEffect} from 'react'
import { useAuth } from '../Account/AuthContext'
import Loading from '../Account/Loading'
import './AllPosts.css'
import WritePost from './WritePost'
import UserPosts from './UserPosts'


function AllPosts() {

    const { loading,loadingPosts,fetchFirstAllUserPosts,disabledPosts,fetchAllUserPosts } = useAuth()
    useEffect(() => {
     
        fetchFirstAllUserPosts()
        window.scroll({
            top: 0, 
            left: 0
           })
    }, [])
    return (
            <div  className="allposts" >
                 {loading && <Loading/>}
                <WritePost title="All Posts" allPostsLink="" type="all"/>
                <UserPosts/>

                {!loadingPosts ? 
                <button
                    disabled={disabledPosts} 
                    className="fetch-more-posts"
                    style={!disabledPosts ? {color:'var(--red)'} : {color:'var(--grey)'}}
                    onClick={fetchAllUserPosts}>
                    {disabledPosts ? "No more Posts" : "Load more posts"}
                </button>
                :
                <div class="loading-posts">
                    <div class="snippet" data-title=".dot-falling">
                    <div class="stage">
                        <div class="dot-falling"></div>
                    </div>
                    </div>
                </div>
                }
              
            </div>
            
    )
}

export default AllPosts
