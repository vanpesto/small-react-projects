import React,{useEffect,useState,useRef} from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Account/AuthContext'


function WritePost({type,title,allPostsLink}) {

    const postsDiv = useRef()
    const fileButton = useRef()
  
    const [error,setError] = useState('')
    const { currentUser,writeNewPost, prepareImageForUpload,image,getUserData } = useAuth()
    const [comment,setComment] = useState("")
    const [postType,setPostType] = useState(type)
    
    const postComment = useRef()


   
    useEffect(() => {
        if(currentUser){
            getUserData(currentUser.uid) 
        }
                   
    }, [])


    async function handleSubmit(e) {
        e.preventDefault()
      
        if(comment==="" && !image){
            setError(true)
            postComment.current.select()
            return
        }else{
            setError(false)
        }
     

        var postId = new Date().getTime()
            
            writeNewPost(postId,comment,postType)
            setComment('')
            postComment.current.select()
           
    }

    return (
      
        <div ref={postsDiv} className="post">
        
        <form className="write-post-form" onSubmit={handleSubmit}>
            {!currentUser ? <p className="no-user-message">If you want to post, comment or like
            <Link to="/login" className="login-btn"> Log In </Link> or 
            <Link to="/signup" className="sign-up-btn"> Sign Up </Link> if you don't have an account.</p>   
            :
            <>
            <h2 className="posts-title">{title}</h2>
            <Link to="/" className="link all-posts-link">{allPostsLink}</Link>
            {error && <p className="error">Please write a comment or add an image</p>}
            <textarea 
            ref={postComment} 
            value={comment} 
            className="write-post-desc" 
            placeholder="What are your thoughts?" 
            onChange={(e)=>(setComment(e.target.value.trimStart()))}>
            </textarea>

            <input 
            type="file" 
            ref={fileButton} 
            id="filePostButton" 
            multiple="" 
            name="file" 
            accept="image/*" 
            hidden="hidden" 
            onChange={(e)=>prepareImageForUpload(e,"tempImage","filePostButton")}/>

            <button 
            type="button" 
            className="post-img-btn" 
            onClick={()=>fileButton.current.click()}>
                {image ? 'Change Image' : 'Add Image'}
            </button>
            
            {image && 
            <div className="post-image">
                <img src={image} alt="Post Img"/>
            </div>
            }
            <button className="post-btn">Post</button>
            </>
            }
        </form>
        </div>
       
  
   
    )
}

export default WritePost
