import React from 'react'
import ImageA from "../assets/asakusa.jpg"
import ImageB from "../assets/otherA.jpg"
import ImageC from "../assets/otherB.jpg"
import ImageD from "../assets/otherC.jpg"
import ImageE from "../assets/otherD.jpg"

function OtherStuff() {
  return (
    <>
      <div className='mb-5'>I went on a trip to Japan last year. It was pretty cool. Here are some pictures I took:</div>
      <div className='grid grid-cols-2 justify-center items-center gap-1'>
        <img  className='object-cover' src={ImageA} alt="asakusa temple" />
        <img  className='object-cover' src={ImageB} alt="osaka castle" />
        <img  className='object-cover' src={ImageC} alt="fish side eye" />
        <img  className='object-cover' src={ImageD} alt="snoopy" />
        <img  className='object-cover' src={ImageE} alt="ramen" />
      </div>
    </>
  )
}

export default OtherStuff