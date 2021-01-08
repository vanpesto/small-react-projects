import React from 'react'
import "./Loading.css"
function Loading() {
    return (
        <div className="loading">
             <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <p>Loading...</p>
        </div>
    )
}

export default Loading