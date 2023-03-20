import React from 'react'
import {useEffect, useState} from 'react';
import axios from 'axios';
import { FormErrorText, FormField, Headding, StyleBtn, StyleCheck, StyleCheckBox, StyleForm, StyleLabel, StyleTerms, TextInput } from './Signup';

const TalentSignup = () => {

    const intialValues = {first_name:"",last_name:"",username:"",email:"",password:"",isChecked:false}
    const[formValues,setFormValues]=useState(intialValues)
    const[formErrors,setFormErrors]=useState({})
    const[isSubmit,setIsSubmit]=useState(false)
    const[tabSubmit,setTabSubmit]=useState(0)


    const onFormChange = (e)=>{
        setFormValues({...formValues,[e.target.name]:e.target.value})
    }

    const onFormHandleSubmit =(e)=>{
        e.preventDefault()
        setFormErrors(validate(formValues))
        setIsSubmit(true)
    }

    const fanDataCall = async(data)=>{
        const res = await axios.post("http://wren.in:3200/api/sign-up/talent",data)
        console.log(res,"res");
        setFormValues(res)
    }

    useEffect(()=>{
        console.log(formErrors);
        if(Object.keys(formErrors).length === 0 && isSubmit){
                fanDataCall(formValues);
                
              
        }

        
    },[formErrors])
   

    const validate =(values)=>{
        const errors ={}
        const regex =  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!values.first_name){
            errors.first_name = "Firstname is required"
        }
        if(!values.last_name){
            errors.last_name = "Lastname is required"
        }
        if(!values.username){
            errors.username = "Username is required"
        }
        if(!values.email){
            errors.email = "Email is required"
        }else if(!regex.test(values.email)){
            errors.email="This is not valid format"
        }
        if(!values.password){
            errors.password = "Password is required"
        }
        else if(values.password.length < 4){
            errors.password="Password is min 4 required"
        }
        else if(values.password.length >10 ){
            errors.password="Password is less 10 required"
        }
        if(values.isChecked === false){
            errors.isChecked = "Check is required"
        }
        return errors;
       
        
    }

  return (
    <div>
        <div>
                    <StyleForm onSubmit={onFormHandleSubmit}>
                <div>
                    <Headding>Create Your Talent Account</Headding>
                </div>
                <div>
                    <FormField>   
                        <StyleLabel>First Name*</StyleLabel>   
                        <TextInput id="outlined-basic" placeholder='First name' variant="outlined" name='first_name' value={formValues.first_name} onChange={onFormChange}/>
                        <FormErrorText>{formErrors.firstName}</FormErrorText>
                    </FormField>
                    <FormField> 
                        <StyleLabel>Last Name*</StyleLabel>      
                        <TextInput id="outlined-basic" placeholder='Last name' variant="outlined" name='last_name' value={formValues.last_name} onChange={onFormChange}/>
                        <FormErrorText>{formErrors.lastName}</FormErrorText>
                    </FormField>
                    <FormField>  
                        <StyleLabel>User Name*</StyleLabel>         
                        <TextInput id="outlined-basic" placeholder='Username' variant="outlined" name='username' value={formValues.username} onChange={onFormChange}/>
                        <FormErrorText>{formErrors.userName}</FormErrorText>
                    </FormField>
                    <FormField>
                        <StyleLabel>Email*</StyleLabel>
                        <TextInput id="outlined-basic" placeholder='Email' variant="outlined" name='email' value={formValues.email} onChange={onFormChange}/>
                        <FormErrorText>{formErrors.email}</FormErrorText>
                    </FormField>
                    <FormField>
                        <StyleLabel>Password*</StyleLabel>
                        <TextInput id="outlined-basic" placeholder='Password' variant="outlined" name='password' value={formValues.password} onChange={onFormChange}/>
                        <FormErrorText>{formErrors.password}</FormErrorText>
                    </FormField>
                </div>
                <StyleCheckBox>
                <StyleCheck  name='isChecked'
                value={formValues.isChecked}
                onChange={onFormChange}/>
                
            
                <label>I agree to the <StyleTerms>Terms and Condition</StyleTerms> </label>
                <FormErrorText>{formErrors.isChecked}</FormErrorText>
                </StyleCheckBox>
                <div>
                    <StyleBtn>SIGNUP</StyleBtn>
                </div>
                </StyleForm>
                        </div>
    </div>
  )
}

export default TalentSignup