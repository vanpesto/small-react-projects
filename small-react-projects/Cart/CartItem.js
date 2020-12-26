import React from 'react'
import {IoIosArrowUp,IoIosArrowDown} from 'react-icons/io'
function CartItem(props) {
    
    return (
        <div className="cart-item">
            <div className="cart-item-img">
                <img src={props.img} alt={props.name}/>
            </div>
            <div className="cart-item-info">
                <p>{props.title}</p>
                <span>${props.price}</span>
                <button className="cart-item-remove-btn" onClick={()=>props.removeItem(props.id)}>remove</button>
            </div>
            <div className="cart-item-amount">
                <button onClick={()=>props.increaseAmount(props.id)} className="cart-item-amount-btn-up"><IoIosArrowUp/></button>
                <span>{props.amount}</span>
                <button onClick={()=>props.decreaseAmount(props.id)} className="cart-item-amount-btn-down"><IoIosArrowDown/></button>
            </div>
        </div>
    )
}

export default CartItem
