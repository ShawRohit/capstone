import './cart-dropdown.styles.scss';
import { useContext } from 'react';
import Button from '../button/button.component';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';

const CartDropDown = ()=>{

    const {cartItems} = useContext(CartContext)
    console.log("============")
    console.log(cartItems)
    console.log("=============")
    return (
        <div className='cart-dropdown-container'>
            {cartItems.map((item)=>{
               return  <CartItem key={item.id} cartItem={item}/>
            })}
            <div className='cart-items'>
                <Button >Go to checkout</Button>
            </div>

        </div>
    )
}

export default CartDropDown