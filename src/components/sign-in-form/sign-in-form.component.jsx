import './sign-in-form.styles.scss';
import { useState , useContext} from "react";
import Button from '../button/button.component';

import FormInput from "../form-input/form-input.component";
import { createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from '../../utils/firebase/firebase.utils';
import { UserContext } from '../../contexts/user.context';

const defaultFormFeilds = {
  
    email : '',
    password : '',
  
}


const SignInForm = ()=>{

    const [formFields,  setFormFeilds] = useState(defaultFormFeilds);
    const { email, password} = formFields;
    const {setCurrentUser} = useContext(UserContext);

    const handleSubmit = async (event)=> {
        event.preventDefault();
        try{
            const {user} = await signInAuthUserWithEmailAndPassword(email,password)
           
        

        }catch(error){
            console.log(error.code)
            switch(error.code){
                case 'auth/user-not-found':
                    alert('User not found');
                    break;
                case 'auth/wrong-password':
                    alert('Invalid credentials');
                    break;
                default:
                    console.log(error)
            }
        }
    }

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setFormFeilds({...formFields,[name]:value})
    }
  
    const signInWithGoogle = async ()=> {
      

        await signInWithGooglePopup();

    }


    return  (
        <div className="sign-up-container">
            <h2>Already have an account</h2>
            <span>
                Sign in with your email and password
            </span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
                <div className='buttons-container'>
                <Button type="submit" >Sign In</Button>
                <Button type="button" onClick={signInWithGoogle} buttonType='google'>Google SignIn</Button>
                </div>
                
            </form>
        </div>
    )
}

export default SignInForm;