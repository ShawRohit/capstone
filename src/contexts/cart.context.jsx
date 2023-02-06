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


const removeCartItem = (cartItems , productToRemove)=>{



    //find if cartItem contains product
    const ifItemExist = cartItems.find((cartItem)=>
         cartItem.id === productToRemove.id
    )

    if (ifItemExist.quantity === 1){
        console.log("----1--------")
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id)
    }

  
    return cartItems.map((cartItem)=>
            cartItem.id===productToRemove.id ? {...cartItem, quantity:cartItem.quantity - 1}:cartItem
    )


}


const clearCartItem = (cartItems , itemToClear)=>{

    return cartItems.filter(cartItem => cartItem.id !== itemToClear.id)

}

export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen :()=>{},
    cartItems :[],
    addItemToCart : ()=>{},
    removeItemFromCart : ()=>{},
    clearItemFromCart : ()=> {},
    cartCount : 0,
    cartTotal: 0,
    setCartTotal : ()=>{}
})

export const CartProvider = ({children})=>{
    const addItemToCart = (productToAdd)=>{
        console.log(productToAdd);
        setCartItem(addCartItem(cartItems, productToAdd))

    }

    const removeItemFromCart = (productToRemove)=>{
        console.log(productToRemove);
        setCartItem(removeCartItem(cartItems, productToRemove))

    }

    const clearItemFromCart = (itemToClear)=>{
        setCartItem(clearCartItem(cartItems, itemToClear))
    }

  


    const [isCartOpen, setIsCartOpen] =useState(false);
    const [cartItems, setCartItem] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)
   

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total,cartItem)=> total + cartItem.quantity, 0);
        setCartCount(newCartCount)
    },[cartItems])

    useEffect(()=>{
        const newCartTotal = cartItems.reduce((total,cartItem)=> total + cartItem.quantity*cartItem.price, 0);
        setCartTotal(newCartTotal)
    },[cartItems])


    const value = {isCartOpen, setIsCartOpen,addItemToCart,removeItemFromCart, clearItemFromCart,cartItems,cartCount,cartTotal}
 

   
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

