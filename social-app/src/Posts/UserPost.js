import React,{useState,useEffect,useRef,useLocation} from 'react'
import firebase from 'firebase'
import { useAuth } from '../Account/AuthContext'
import { AiFillLike } from 'react-icons/ai'
import Comment from './Comment'
import { Link } from 'react-router-dom'
import Picker from 'emoji-picker-react';
import { BiSmile } from 'react-icons/bi' 
import "./Comments.css"
function UserPost(props) {

    const {currentUser,getUserData,userData} = useAuth()

    const [likes,setLikes] = useState(props.likes)
    const [numComments,setNumComments] = useState(0)
    const [comment,setComment] = useState("")
    const [comments,setComments] = useState([])
    const [isLiked,setIsLiked] = useState(false) 
    const [disabled, setDisabled] = useState(false)
    const [lastComment, setLastComment] = useState()
    const [error,setError] = useState('')
    const [loadingComments,setLoadingComments] = useState(false)
    const [emojiPicker, setEmojiPicker] = useState(false);
    const [sortToOldest,setSortToOldest] = useState(false)

    const commentSection = useRef()
    const textarea = useRef()

    useEffect(() => {
     
        if(currentUser){
            getUserData(currentUser.uid)
        }
        getTotalComments()
        loadFirstComments()
        if(currentUser){
            firebase.database().ref(`Posts/${props.postId}/likedBy`).on("value", function(snapshot) {
                snapshot.forEach(function(data) {
                   
                    if(currentUser.uid===data.key){
                        setIsLiked(true)
                    }
                })
            })
        }
        

    }, [])
    useEffect(() => {
       if(comments.length >= numComments){
           setDisabled(true)
       }else{
           setDisabled(false)
       }
    }, [comments,numComments])
  
    const onEmojiClick = (event, emojiObject) => {
        setComment(comment+emojiObject.emoji)
        textarea.current.select()
      };

    function loadFirstComments() {
       setLoadingComments(true)
        var array=[]
        var counter = 0
       
       firebase.database().ref(`Posts/${props.postId}/comments`).orderByKey().limitToLast(3).once("value",function (snapshot) {
            
            snapshot.forEach(function(data) {
               
                firebase.database().ref(`/Posts/${props.postId}/comments/${data.key}`).once('value').then((snapshot) => {
                
                    counter++
                    if(counter < 2){
                        setLastComment(data.key)
                    }
                    array=[snapshot.exportVal(),...array]
                    setComments(array)
                
                })
               
            })
            setLoadingComments(false)
            })
         
         
    }

    const getTotalComments = () => {
         firebase.database().ref(`Posts/${props.postId}/numComments`).on("value",function (snapshot) {
           
            setNumComments(snapshot.exportVal())
            loadFirstComments()
        })
    }
  
    function loadComments() {
        setLoadingComments(true)
        var arrayComments=comments
       
        var tempArray = [] 
        setComment([])
        var counter = 0
        var counter2= 0;
      
        firebase.database().ref(`Posts/${props.postId}/comments`).orderByKey().endAt(lastComment).limitToLast(4).once("value",function (snapshot) {
            snapshot.forEach(function(data) {
               
                firebase.database().ref(`/Posts/${props.postId}/comments/${data.key}`).once('value').then((snapshot) => {
                    if(data.key!==lastComment){
                    counter++;
                    if(counter < 2){
                        setLastComment(data.key)
                    }
                    
                    tempArray=[snapshot.exportVal(),...tempArray]
                }
                   
                }).then(function () {
                    counter2++
                  
                    if(comments.length+counter2>numComments && counter2 !==3){
                        arrayComments=[...arrayComments,...tempArray]
                        setComments(arrayComments)
                    }
                    if(counter2 === 3){
                        arrayComments=[...arrayComments,...tempArray]
                        setComments(arrayComments)
                    }
                })
            })
            setLoadingComments(false)

        })
        
    }
    function writeComment() {
        if(!currentUser){
            setError("You need an account to Like or Write a comment!")
            setTimeout(()=>{
                setError('')
            },2000)
        }else{
            var commentId = new Date().getTime()
            firebase.database().ref(`Posts/${props.postId}/comments/${commentId}`).set({
                comment:comment,
                username:userData.username,
                userImage:userData.userImage,
                
            })
            firebase.database().ref(`Posts/${props.postId}/numComments`).set(numComments+1).then(function () {
                getTotalComments()
              
            })
        }
    }
    const handleKeyPress = (e) =>{
        if(e.key === 'Enter'){
            if(comment===""){
                return
            }
            setEmojiPicker(false)
            writeComment()
            setComment('')
        }
    }
    function updateLikes(postId) {
        if(!currentUser){
            setError("You need an account to Like or Write a comment!")
            setTimeout(()=>{
                setError('')
            },4000)
        }else{
            setLikes(likes+1)
            setIsLiked(true)
            firebase.database().ref(`Posts/${postId}`).update({
                likes:likes+1,
            })
            
            firebase.database().ref(`Posts/${postId}/likedBy/${currentUser.uid}`).set(currentUser.uid)
        }
    }

   
    return (
        <div className="post">

            <Link className="post-user" 
             to={!currentUser ? {
                pathname: '/user-profile',
                state:props.userId
             }:
                currentUser.uid===props.userId ? {
                pathname: '/account',
               
            }:{
                pathname: '/user-profile',
                state:props.userId
            }}>
                <div className="post-user-img user-img-bg">
                    <img src={props.userImage} alt="profile pic"/>
                </div>
                <div className="post-user-details">
                    <span className="post-user-username">{props.user}</span>
                    <div className="post-user-fulldate">
                        <span className="post-user-date">{props.date.date}</span>
                        <span className="post-user-time"> <span className="in">in</span>{props.date.time}</span>
                    </div>
                </div>
            </Link>
            <p className="post-desc">{props.comment}</p>
            <div className="post-image">
                    <img src={props.postImage} alt=""/>
            </div>
            {error && <p className="error">{error}</p>}
            <div className="likes-and-comments">
                <div className={`likes`}>
                    <button disabled={isLiked} onClick={()=>updateLikes(props.postId)} className={`likes-btn ${isLiked && 'liked'}`}><span className="like-icon"><AiFillLike/></span>Like</button>
                    <span className="num-likes">{likes}</span>
                </div>
                <div className="comments-info">
                   
                    <span>{numComments} comments</span>
                </div>
            </div>
            <div className="sort-comments">
                <button className="comments-oldest" onClick={()=>setSortToOldest(true)}>Oldest</button>
            </div>
            <div className="write-comment-container" style={emojiPicker ? {border:"1px solid var(--red)"}:{color:""}}>
            <textarea value={comment}
                ref={textarea}
                onChange={(e)=>setComment(e.target.value.trimStart())} 
                onKeyPress={(e)=>handleKeyPress(e)} 
                className="write-comment" 
                placeholder="Write a comment">
             </textarea>
            <div className="emoji-picker" onClick={()=>setEmojiPicker(!emojiPicker)}><BiSmile/></div>
             </div>
             {emojiPicker && <Picker onEmojiClick={onEmojiClick} disableSearchBar="true" disableSkinTonePicker="true" />}
            <div  ref={commentSection} className="comments">
                {sortToOldest && setComments([...comments.reverse()])}
                { comments.reverse().map(item =>{
                    console.log(item)
                    return <Comment comment={item}/>
                    
                    
                })}
                {!loadingComments ? 
                <button 
                className="more-comments-btn" 
                disabled={disabled} 
                style={!disabled ? {color:'var(--red)'} : {color:'var(--grey)'}} 
                onClick={()=>{
                        loadComments()
                }}>{!disabled ? 'Load more comments' : ''}</button>
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
        </div>
    )
}

export default UserPost
