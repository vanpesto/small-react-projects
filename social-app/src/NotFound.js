import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="not-found">
        <div className="not-found-container">
            <p>Page Not Found</p>
            <Link className="link" to="/">Go back to Main page</Link>
        </div>
        </div>
    )
}

export default NotFound
