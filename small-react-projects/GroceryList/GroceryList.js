import React,{useState,useEffect} from 'react'
import Alert from './Alert'
import './GroceryList.css'
import GroceryItem from './GroceryItem'

  
    function GroceryBud() {

        const [item,setItem] = useState('')
        const [list, setList] = useState([])
        const [alert,setAlert] = useState({show:false, msg:'', type:''})


       
        const addItem = () =>{
            if(!item){
                showAlert(true, 'Please enter value', 'danger')
            }else{
                showAlert(true, 'item added successfully ', 'success')
                setList([...list,item])
                setItem('')
            }
        }
       const updateItem = (index,value)=>{
            let newItems = list
            newItems[index] = value
            setList(newItems)
        }
        const deleteItem = (value)=>{
            setList(list.filter(arrayItem=>(arrayItem!==value)))
        }
        const showAlert = (show=false, msg='', type='') =>{
         

            setAlert({show,msg,type})
        }
        return (
            <div className="grocery">
            
                {alert.show && <Alert {...alert} removeAlert={showAlert}/>}
                <h3 className="grocery-title">Grocery List</h3>
                <div className="grocery-add-container">
                    <input 
                        className="grocery-add-item" 
                        type="text" placeholder="e.g. eggs" 
                        value={item} onChange={(e)=>setItem(e.target.value)}
                        onKeyPress={(e)=>{
                            e.key === 'Enter' && addItem()
                        }} 
                    />
                    <button className="grocery-btn" onClick={addItem}>Add Item</button>
                </div>
                <div className="grocery-items">
                
                    {list.map((item,index)=>{
                        return <GroceryItem value={item} deleteItem={deleteItem} showAlert={showAlert} updateItem={updateItem} key={index} index={index}/>;
                    })}
                </div>
                {list.length>0 && <button 
                    className="grocery-clear-all-btn" 
                    onClick={()=>{
                        setList([])
                        showAlert(true, 'All items removed', 'danger')
                    }}
                    >Clear All
                    </button>}
            </div>
        )
    }
    
    export default GroceryBud
    