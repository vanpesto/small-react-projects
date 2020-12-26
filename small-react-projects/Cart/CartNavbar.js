import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
function CartNavbar(props) {
    return (
        <div className="cart-navbar">
            <h3>Shopping Cart</h3>
            <button className="cart-btn"><FaShoppingCart/> <span>{props.amount}</span></button>
        </div>
    )
}

export default CartNavbar
