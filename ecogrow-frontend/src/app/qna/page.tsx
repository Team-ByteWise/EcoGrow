import React from 'react'
import { FormDemo } from './components/Form'
import { FaqDemo } from './components/FAQ'




const page = () => {
  return (
    <div className='flex flex-col md:flex-row'>
       <div className='w-full md:w-1/2'><FormDemo/></div>
       <div className='w-full md:w-1/2'><FaqDemo/></div>
        
    </div>
  )
}

export default page