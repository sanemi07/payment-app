import React from 'react'

const Appbar = () => {
  return (
    <div className='shadow h-14 flex justify-between '>
        <div className='flex flex-col ml-4 justify-center font-md '>Payment App</div>
        <div className='flex'>
            <div className='h-full flex flex-col justify-center mr-4 font-semibold'>
                Hello
            </div>
            <div className=' flex flex-col justify-center mr-5 mt-2 rounded-full h-10 w-10 bg-slate-400 '>
                <div className='flex justify-center text-white font-semibold'>U</div>
            </div>

        </div>
      
    </div>
  )
}

export default Appbar
