import React from 'react'

const InputBox = ({label ,placeHolder,onChange}) => {
  return (
    <div className='mt-1.5'>
        <div className='font-semibold text-sm py-1 text-left ' >
            {label}
        </div>
        <input  onChange={onChange}   placeholder={placeHolder} className='bg-white shadow-md rounded-md w-full  pl-2 pt-2 pb-1 ' />

      
    </div>
  )
}

export default InputBox
