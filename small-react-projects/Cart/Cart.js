import React,{useEffect,useReducer} from 'react'
import CartItem from './CartItem'
import {data} from './data'
import './Cart.css'

import CartNavbar from './CartNavbar'

const ACTIONS = {
    INCREASE_AMOUNT:'increase_amount',
    DECREASE_AMOUNT:'decrease_amount',
    REMOVE_ITEM:'remove_Item',
    GET_TOTAL:'get_total'
}
var initialState = {
    cartItems:data,
    total:1799.97,
    amount:3
}

function reducer(state,action){
  
    switch(action.type){
        case ACTIONS.INCREASE_AMOUNT:{
   
        let tempCart = state.cartItems.map(cartItem => {
            if(cartItem.id === action.payload){
               
                return {...cartItem, amount:cartItem.amount + 1}
                
            }
            return cartItem
        })
       
           return {...state,cartItems:tempCart}
        }
        case ACTIONS.DECREASE_AMOUNT:{
        
            let tempCart = state.cartItems.map(cartItem => {
                if(cartItem.id === action.payload){
                  
                    return {...cartItem, amount:cartItem.amount - 1}
                    
                }
                return cartItem
            })
               .filter((cartItem)=>cartItem.amount !== 0)
               return {...state,cartItems:tempCart}
        }

        case ACTIONS.REMOVE_ITEM:{
            let tempCart = state.cartItems.filter(cartItem=> cartItem.id !== action.payload)
            return {...state, cartItems:tempCart}
        }
        case ACTIONS.GET_TOTAL:{
            let total = 0
            let amount = 0
            state.cartItems.map(cartItem => {
                 
                    amount += cartItem.amount
                    total += cartItem.price*cartItem.amount
            })
       
            return {...state,total:total,amount:amount}
        }

        default: return state;
    }
}

function CartItems() {
   
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        dispatch({type:ACTIONS.GET_TOTAL})
    }, [state.cartItems])

    const increaseAmount = (id) =>{
        dispatch({type:ACTIONS.INCREASE_AMOUNT,payload:id})
    }
    const decreaseAmount = (id) =>{
        dispatch({type:ACTIONS.DECREASE_AMOUNT, payload:id})
    }
    const removeItem = (id) =>{
        dispatch({type:ACTIONS.REMOVE_ITEM, payload:id})
    }
    
    return (
        <div className="cart">

            <CartNavbar amount={state.amount}/>
            <div className="cart-container">
                <div className="cart-items">
                    <h3>Your Cart</h3>
                    {state.cartItems.length<=0 ? <p className="cart-empty">is empy</p>
                    :
                    state.cartItems.map(item=>{
                        return <CartItem 
                        increaseAmount={increaseAmount} 
                        decreaseAmount={decreaseAmount} 
                        removeItem={removeItem} 
                        key={item.id} 
                        {...item}/>
                    })}
                </div>
                <div className="cart-total">Total:${parseFloat(state.total.toFixed(2))}</div>
            </div>
        </div>
    )
}

export default CartItems
