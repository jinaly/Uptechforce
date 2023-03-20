import { Checkbox, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import FormHelperText from '@mui/material/FormHelperText';
import axios from 'axios';
import TalentSignup from './TalentSignup';



const Signup = () => {

    const intialValues = {firstName:"",lastName:"",userName:"",email:"",password:"",isChecked:false}
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
        const res = await axios.post("http://wren.in:3200/api/sign-up/fan",data)
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
        if(!values.firstName){
            errors.firstName = "Firstname is required"
        }
        if(!values.lastName){
            errors.lastName = "Lastname is required"
        }
        if(!values.userName){
            errors.userName = "Username is required"
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
    <StyleBackground>
        <BtnData>
            <FanBtn  onClick={()=>setTabSubmit(0)} style={{backgroundColor:tabSubmit===0?"green":"grey"}}>FAN SIGNUP</FanBtn>
            <TalentBtn  onClick={()=>setTabSubmit(1)} style={{backgroundColor:tabSubmit===1?"green":"grey"}}>TALENT SIGNUP</TalentBtn>
        </BtnData>
       
    {
        tabSubmit === 0?
                <div>
                    <StyleForm onSubmit={onFormHandleSubmit}>
                <div>
                    <Headding>Create Your Fan Account</Headding>
                </div>
                <div>
                    <FormField>   
                        <StyleLabel>First Name*</StyleLabel>   
                        <TextInput id="outlined-basic" placeholder='First name' autoComplete='off' variant="outlined" name='firstName' value={formValues.firstName} onChange={onFormChange}/>
                        <FormErrorText>{formErrors.firstName}</FormErrorText>
                    </FormField>
                    <FormField> 
                        <StyleLabel>Last Name*</StyleLabel>      
                        <TextInput id="outlined-basic" placeholder='Last name' autoComplete='off' variant="outlined" name='lastName' value={formValues.lastName} onChange={onFormChange}/>
                        <FormErrorText>{formErrors.lastName}</FormErrorText>
                    </FormField>
                    <FormField>  
                        <StyleLabel>User Name*</StyleLabel>         
                        <TextInput id="outlined-basic" placeholder='Username' variant="outlined" autoComplete='off' name='userName' value={formValues.userName} onChange={onFormChange}/>
                        <FormErrorText>{formErrors.userName}</FormErrorText>
                    </FormField>
                    <FormField>
                        <StyleLabel>Email*</StyleLabel>
                        <TextInput id="outlined-basic" placeholder='Email' type='email' autoComplete='off' variant="outlined" name='email' value={formValues.email} onChange={onFormChange}/>
                        <FormErrorText>{formErrors.email}</FormErrorText>
                    </FormField>
                    <FormField>
                        <StyleLabel>Password*</StyleLabel>
                        <TextInput id="outlined-basic" placeholder='Password' type='password' autoComplete='off' variant="outlined" name='password' value={formValues.password} onChange={onFormChange}/>
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
                    
        : 
        <>
            <TalentSignup/>
        </>
    }
        
    </StyleBackground>
  )
}

export default Signup

export const StyleBackground = styled.div`
    background-color: black;
    max-width: 100vw;
    min-height: 100vh;
`
export const BtnData = styled.div`
    text-align: center;
    padding-top: 2.5rem;
`
export const FanBtn = styled.button`
    padding: 9px;
    color: white;
    background-color: grey;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
`
export const TalentBtn = styled.button`
    padding: 9px;
    color: white;
    background-color: grey;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
`

export const Headding = styled.h1`
    font-size: 1.5rem;
    margin-top: 15px;
    @media(min-width: 320px) and (max-width:480px) {
        margin-top: 2rem ;
        font-size: 23px;
    }   
`
export const StyleForm = styled.form`
    align-items: center;
    flex-direction: column;
    display: flex;
    background-color: black;
    color: white;  
    height: auto;
`

export const FormField = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin-top: 1rem;  
`
export const StyleLabel = styled.label`
    margin-bottom: 10px;
    @media(min-width: 481px) and (max-width:768px) {
        font-size: 15px;
    }
    @media(min-width: 320px) and (max-width:480px) {
        font-size: 19px;
    }
`

export const TextInput = styled(TextField)` 
        div{
        border: 1px solid green ;
        color: white ;  
        border-radius: 10rem ;
        max-width :100% ;
        width: 25vw;
        input{
            height: 10px;
        }
        @media(max-width:768px){
            width: 30vw;
            input{
                
                height: 10px;
                padding: 15px;
                font-size: small;
            }
         }
         @media(min-width: 320px) and (max-width:480px) {
            width: auto;
            input{
                height: 0px;
                padding: 15px;
                font-size: small;
               
            }
         }
       
    }   
`

export const StyleCheckBox = styled.div`
    align-items: center;
    @media(max-width:768){
           font-size: 1rem ;
           color: red;
         }
`

export const StyleCheck = styled(Checkbox)`
    color: green !important;
    @media(max-width:768){
           font-size: 1rem ;
           color: red;
         }
`
export const StyleTerms = styled.span`
    color:green;
`

export const StyleBtn = styled.button`
    background-color: green;
    color: black;
    border-radius: 10rem;
    border: 1px solid green;
    max-width: 100%;
    width: 10vw;
    padding: 10px;
    font-weight: 550;
    font-size: 1rem;
    @media(min-width: 320px) and (max-width:480px) {
        max-width: 100%;
        width: 15vw;
        padding: 5px;
        font-weight: 550;
        font-size: 10px;
         }
`
export const FormErrorText = styled(FormHelperText)`
    color : red !important;
`