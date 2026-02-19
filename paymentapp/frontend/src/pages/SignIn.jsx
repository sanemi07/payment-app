import React from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()
  return (
    <div className='  bg-slate-300 flex h-screen justify-center p-25 '>
      <div className='flex flex-col bg-white p-6 shadow-md rounded-2xl h-100 w-100'>
        <Heading label={'SignIn'}/>
        <SubHeading label={"Enter email and password"}/>
        <InputBox  onChange={(e)=>{
          setEmail(e.target.value)
        }} label={"email"} placeHolder={"email"}/>
        <InputBox onChange={(e)=>{
          setPassword(e.target.value)
        }}  label={"password"} placeHolder={"123456"}/>
        <div className='mt-10'>
          <Button onClick={async()=>{
          const res=await axios.post("http://localhost:3000/api/v1/users/signin",{
           
            email,
            password
          })
          localStorage.setItem("token",res.data.token)
          navigate("/dashboard")}}   label={"SignIn"}></Button>
        </div>
        <BottomWarning label={"Dont have An Account?"} text={"SignUp"} to={"/"}></BottomWarning>

      </div>
    </div>
  )
}

export default SignIn
