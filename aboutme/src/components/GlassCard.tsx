import React, { useState } from 'react'
import ArrowIcon from "../assets/left-arrow-return-svgrepo-com.svg"
import styles from "./GlassCard.module.css"

function GlassCard() {
  const [onDisplay, setOnDisplay] = useState(false);

  if (!onDisplay) {
    return (
      <img
        src={ArrowIcon}
        className='h-[50px] w-[50px] absolute bottom-[50%] right-0 mr-5 border rounded-full p-3 bg-gray-50 hover:cursor-pointer'
        onClick={() => setOnDisplay(true)}
      />
    )
  }

  return (
    <div className='flex flex-col w-[50%] h-[60%] border border-gray-300'>
      <div className='bg-gray-300 p-3 flex-1 font-bold'>About Me</div>
      <div className='bg-gray-100 flex-7 p-3'>
        <p>Description should go here!!!</p>
        <p>Description should go here!!!</p>
      </div>
    </div>
  )
}

export default GlassCard