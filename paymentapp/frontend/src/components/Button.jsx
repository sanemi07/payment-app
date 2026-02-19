import React from 'react'

const Button = ({label,onClick}) => {
  return (
    <div>
     <button  onClick={onClick}  className='bg-black text-white font-semibold w-full 
      rounded-2xl p-2 hover:shadow-2xl '>{label}</button>
    </div>
  )
}

export default Button
