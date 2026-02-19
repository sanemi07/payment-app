import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Balance = () => {
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    const fetchBalance = async () => {
      const token = localStorage.getItem('token')
      
      const response = await axios.get(
        'http://localhost:3000/api/v1/accounts/getbalance',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
    
      setBalance(response.data.balance) // adjust key based on backend response
    }

    fetchBalance()
  }, [])

  return <div className='font-bold text-2xl'>Your Balance Rs {balance}</div>
}

export default Balance
