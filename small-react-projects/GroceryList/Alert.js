import React,{useEffect} from 'react'

function Alert(props) {

    useEffect(() => {
 
        const timeout = setTimeout(()=>{
            props.removeAlert()
        },3000)
        return () => clearTimeout(timeout)
    }, [])
    return (
        <p className={`alert alert-${props.type}`}>{props.msg}</p>
    )
}

export default Alert
