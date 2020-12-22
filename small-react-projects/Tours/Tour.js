import React,{useState} from 'react'
import './Tour.css'
function Tour(props) {

    const [readMore,setReadMore] = useState(false)

    return (
        <article className="single-tour">
           
            <img src={props.image} alt={props.name}/>
            <footer>
                <div className="single-tour-info">
                    <h4>{props.name}</h4>
                    <span className="single-tour-price">${props.price}</span>
                </div>
                <p>{readMore ? props.info : `${props.info.substring(0,200)}...`}
                    <button className="read-more" onClick={()=> setReadMore(!readMore)}>
                        {readMore ? 'Show Less' : 'Read More'}
                    </button>
                </p>
                <button className="delete-btn" onClick={()=>{props.removeTour(props.id)}}>not interested</button>
            </footer>
        </article>
    )
}

export default Tour
