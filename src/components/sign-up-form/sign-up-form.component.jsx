import './sign-up-form.styles.scss';
import { useState } from "react";
import Button from '../button/button.component';

import FormInput from "../form-input/form-input.component";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';


const defaultFormFeilds = {
    displayName : '',
    email : '',
    password : '',
    confirmPassword : ''
}


const SignUpForm = ()=>{

    const [formFields,  setFormFeilds] = useState(defaultFormFeilds);
    const {displayName, email, password, confirmPassword} = formFields;

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setFormFeilds({...formFields,[name]: value})
    }

    const resetFormFields = ()=>{
        setFormFeilds(defaultFormFeilds)
    }
  

    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(password !== confirmPassword){
            alert('Passwords do not match');
            return
        }
        try{
            //code
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user,{displayName})
            resetFormFields()
        }catch(error){
            console.log(error)
        }











    }
    return  (
        <div className="sign-up-container">
            <h2>Don't have an account</h2>
            <span>
                Sign up with your email and password
            </span>

            <form onSubmit={handleSubmit}>
               
                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName}/>

           
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>

       
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>

          
                <FormInput label="Confirm password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
                
                <Button type="submit" >Sign up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;