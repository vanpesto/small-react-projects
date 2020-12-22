import React,{useState} from 'react'
import SingleColor from './SingleColor'
import Values from 'values.js'
import './Colors.css'
function Colors() {

    const [color,setColor] = useState('')
    const [error,setError] = useState(false)
    const [list, setList] = useState(new Values('#f15025').all(10))

    const handleSubmit = (e) =>{
        e.preventDefault()
        try {
            let colors = new Values(color).all(10)
            setList(colors)
        } catch (error) {
            setError(true)
            console.log(error)
        }
      
    }

    return (
        <>
        <section className="color-container">
            <h3>color generator</h3>
            <form onSubmit={handleSubmit}>
                <input 
                className={`${error ? 'error' : null}`}
                type="text" 
                value={color} 
                onChange={(e)=>setColor(e.target.value)} 
                placeholder="#f15025"
                />
                <button className="color-btn" type="submit">Submit</button>
            </form>
        </section>
        <section className="colors">
            {list.map((color,index)=>{
                return <SingleColor key={index} {...color} index={index} hexColor={color.hex}/>
            })}
        </section>
        </>
    )
}

export default Colors
