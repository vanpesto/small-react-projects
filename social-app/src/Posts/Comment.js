import React from 'react'

function Comment({comment}) {
    return (
        <div className="user-comment-container">
            <div className="user-comment-image user-img-bg">
                <img src={comment.userImage} alt="user"/>
            </div>
            <div className="user-comment-details">
                <p className="user-comment-username">{comment.username}</p>
                <p className="user-comment">{comment.comment}</p>
            </div>
        </div> 
    )
}

export default Comment
