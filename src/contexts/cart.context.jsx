import { useEffect } from "react";
import { createContext , useState} from "react";

const addCartItem = (cartItems , productToAdd)=>{

    console.log(cartItems);
    console.log(productToAdd);


    //find if cartItem contains product
    const ifItemExist = cartItems.find((cartItem)=>
         cartItem.id === productToAdd.id
    )


    

    //if found increment quantity

    if (ifItemExist){
        return cartItems.map((cartItem)=>
             cartItem.id===productToAdd.id ? {...cartItem, quantity:cartItem.quantity + 1}:cartItem
        )
    }

    //if not found creat a new item

    return [...cartItems,{...productToAdd,quantity:1}]

}

export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen :()=>{},
    cartItems :[],
    addItemToCart : ()=>{},
    cartCount : 0
})

export const CartProvider = ({children})=>{
    const addItemToCart = (productToAdd)=>{
        console.log(productToAdd);
        setCartItem(addCartItem(cartItems, productToAdd))

    }

  


    const [isCartOpen, setIsCartOpen] =useState(false);
    const [cartItems, setCartItem] = useState([])
    const [cartCount, setCartCount] = useState(0)
   

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total,cartItem)=> total + cartItem.quantity, 0);
        setCartCount(newCartCount)
    },[cartItems])


    const value = {isCartOpen, setIsCartOpen,addItemToCart, cartItems,cartCount}
 

   
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

