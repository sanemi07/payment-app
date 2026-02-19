import React, { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [firstName,setFirstname]=useState("")
  const [lastName,setLastname]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const navigate=useNavigate()






  return (
    <div className=' bg-slate-300 flex h-screen justify-center p-25 '>
      <div className=' flex flex-col bg-white p-6 shadow-md rounded-2xl h-130 w-100'>
      <Heading label={"SignUp"}/>
      <SubHeading label={"Enter your information to create an account"}/>
      <InputBox onChange={(e)=>{
        setFirstname(e.target.value)
      }}
       label={"First Name"} 
       placeHolder={"Name"}/>



       <InputBox onChange={(e)=>{
        setLastname(e.target.value)
      }} label={"last Name"} placeHolder={"Name"}/>
        <InputBox 
        onChange={(e)=>{
        setEmail(e.target.value)
      }}label={"Email"} placeHolder={"email"}/>
         <InputBox 
          onChange={(e)=>{
        setPassword(e.target.value)
      }}label={"Password"} placeHolder={"123456"}/>
         <div className='pt-7'>
         <Button  onClick={async()=>{
          const res=await axios.post("http://localhost:3000/api/v1/users/signup",{
            firstName,
            lastName,
            email,
            password
          })
          localStorage.setItem("token",res.data.token)
          navigate("/dashboard")




         }}   label={"Signup"}></Button>
         
         
         </div>
         <BottomWarning label={"Already Have an Account ?"} text={"Signin"} to={"/signin"}/>
         


      </div>
      
    </div>
  )
}

export default SignUp
