import React, { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from './InputBox'
import Button from './Button'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'

const SendMoney = () => {
  const [searchParams]=useSearchParams()
  const id=searchParams.get("id")
  const name=searchParams.get("firstName")
  const [amount, setAmount] = useState('')
  const navigate=useNavigate()

  return (
    <div className='bg-slate-300 flex h-screen justify-center p-25'>
      <div className='flex flex-col bg-white p-6 shadow-md rounded-2xl h-100 w-100'>
        <Heading label={'Send Money'} />
        <SubHeading label={'Enter  amount'} />
        <div className=' flex justify-center font-semibold'> Sending to {name}</div>

        

        <InputBox
          label={'Amount'}
          placeHolder={'1000'}
          onChange={(e) => {
            setAmount(e.target.value)
          }}
        />

        <div className='mt-10'>
          <Button
            label={'Send'}
            onClick={() => {
              const token=localStorage.getItem("token")
              axios.post("http://localhost:3000/api/v1/accounts/transfer",{
                to:id,
                amount:amount

              },{
                headers: { Authorization: `Bearer ${token}` }

              }).then((response)=>{alert("money Transfered")
                navigate('/dashboard')

              })
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default SendMoney
