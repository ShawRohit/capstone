import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import {createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils"
import FormInput from "../../components/form-input/form-input.component";


import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = ()=>{


        const logGoogleUser = async ()=>{
            const { user} = await signInWithGooglePopup();
            console.log(user)
            createUserDocumentFromAuth(user) 
        }
    
    
    return (
        <div>
            <h1>Hello from sign In</h1>
            <button onClick={logGoogleUser}>Sign in with google</button>
            <SignUpForm />
        </div>
    )
}

export default SignIn;