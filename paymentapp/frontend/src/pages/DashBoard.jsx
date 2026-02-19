import React from 'react'
import Appbar from '../components/Appbar'
import Balance from '../components/Balance'
import Users from '../components/Users'

const DashBoard = () => {
  return (
    <div>
      <Appbar></Appbar>
      <div className='mt-2 p-4'>
        <Balance></Balance>
      </div>
      <Users></Users>
    </div>
  )
}

export default DashBoard
