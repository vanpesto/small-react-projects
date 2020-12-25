import React,{useState,useEffect} from 'react'
import $ from 'jquery'
import { BiEdit } from "react-icons/bi";
import {MdDeleteForever} from 'react-icons/md'

function GroceryItem(props) {

    const [value,setValue]=useState(props.value)
    const [editable,setEditable] = useState(true)
 

    $(document).on("click", function(e){ 
        if(e.target.className!=='grocery-btn-edit'){
        setEditable(true)
        }
    });
    useEffect(() => {
        setValue(props.value)
    }, [props.value])
  
    return (
        <div className={`grocery-item ${editable ? 'grocery-item-read' : 'grocery-item-write'}` }>
            <textarea 
            id={`input${props.index}`} 
            readOnly={editable} 
            type="text" 
            value={value}
            onKeyPress={(e)=>{
                e.key === 'Enter' && setEditable(true)
            }} 
            onChange={(e)=>setValue(e.target.value)}
            ></textarea>
            <div className="grocery-item-btn-container">
                <button className="grocery-btn-edit" onClick={()=>{
                    props.updateItem(props.index,props.value)
                    setEditable(false)
                    document.getElementById(`input${props.index}`).select()
                    }}><span><BiEdit /></span>
                </button>
                <button className="grocery-btn-delete" onClick={()=>{
                    props.deleteItem(props.value)
                    props.showAlert(true,'Item Removed','danger')
                }
                }>
                    <MdDeleteForever/>
                    </button>
            </div>
        </div>
    )
}

export default GroceryItem
