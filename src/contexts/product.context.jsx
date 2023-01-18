
import { createContext, useState } from "react";
import PRODUCTS from '../shop-data.json'




//AS ACTUAL VALUE YOU WANT TO ACCESS
export const ProductContext = createContext({
    products : [],
})

export const ProductProvider = ({children})=>{
    const [products, setProducts] = useState(PRODUCTS)
    const value = {products}
    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}
