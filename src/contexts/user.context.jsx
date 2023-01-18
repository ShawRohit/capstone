import { useEffect } from "react";
import { createContext, useState } from "react";
import { onAuthStateChangedListner, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";



//AS ACTUAL VALUE YOU WANT TO ACCESS
export const UserContext = createContext({
    currentUser : null,
    setCurrentUser : ()=> null

})

export const UserProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser}

    useEffect(()=>{
       const unsubscribe =  onAuthStateChangedListner((user)=>{
        if(user){
            createUserDocumentFromAuth(user)
        }
        setCurrentUser(user);
       })
       return unsubscribe
    },[])


    return <UserContext.Provider value={value}>{children}</UserContext.Provider>

}