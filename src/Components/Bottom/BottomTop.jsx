import React from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
const BottomTop = () => {
  return (
    <div className='h-28 border-b border-t border-gray-800 flex justify-center items-center flex-col my-5'>
      <p className='font-header text-xs w-fit font-semibold'>See personalized recommendations</p>
      <Link to={'/signin'} className='flex justify-center items-center font-heading py-1 m-1'>
        <Button variant="contained" size="small" style={{backgroundColor:"#ffdf00",color:"black", width:'16rem'}}>Sign in</Button>
       </Link>
      <div className='flex gap-1 text-[11px] font-des font-medium w-fit'>
        <p>New customer?</p>
        <Link to={'/signup'} className='text-blue-700 hover:text-red-800 cursor-pointer duration-75 font-medium'>Start here.</Link>
      </div>
    </div>
  )
}

export default BottomTop
