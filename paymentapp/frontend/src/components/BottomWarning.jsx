import React from 'react'
import { Link } from 'react-router-dom'

const BottomWarning = ({label,text,to}) => {
  return (
    <div className='flex justify-center p-2 '>
      <div className='text-md'>{label}</div>
      <Link className='underline cursor-pointer text-md  pl-1' to={to}>{text}</Link>
    </div>
  )
}

export default BottomWarning
