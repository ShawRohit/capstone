

/* STEPS TO GET FIREBASE CONFIGURATION

1) LOGIN TO FIREBASE CONSOLE
2) GO TO CONSOLE
3) CREATE A PROJECT
4) CLICK ON CONTINUE
5) CLICK ON SUBMIT 
6) CLICK ON ADD APP 
7) CHOOSE THE APP TYPE (WEB , ANDROID , IOS)
8) GIVE YOUR DB NAME AND HIT CONTINUE 

FIREBASE WILL GIVE YOU THE CODE REQUIRE THAT YOUR PROJECTS REQUIRE TO SETUP PROJECT

*/




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword

} from "firebase/auth"

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpmHvm-3IEr9GKbh2154MdU-B39Mg1CUw",
  authDomain: "crwn-clothing-db-39ff1.firebaseapp.com",
  projectId: "crwn-clothing-db-39ff1",
  storageBucket: "crwn-clothing-db-39ff1.appspot.com",
  messagingSenderId: "25649099785",
  appId: "1:25649099785:web:589e6268ec8cf0fa10b4d8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt : "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = ()=> signInWithPopup(auth, provider);


//Acess database , db object directly points to object of firestore database
export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth, additionalInformation={})=>{
    const userDocRef = doc(db,'users', userAuth.uid);
    console.log(userDocRef)
    const user = await getDoc(userDocRef);
    if(!user.exists()){
        const {displayName, email } = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef,{
                displayName, email, createdAt,...additionalInformation
            })
        }catch(error) {
            console.log('error creating while user', error.message)
        }
    }
    return userDocRef
  
}


export const createAuthUserWithEmailAndPassword = async (email, passowrd)=>{
    if(!email || !passowrd) return;

    return await createUserWithEmailAndPassword(auth , email , passowrd)


}


export const signInAuthUserWithEmailAndPassword = async (email, passowrd)=>{
    if(!email || !passowrd) return;

    return await signInWithEmailAndPassword(auth , email , passowrd)


}
