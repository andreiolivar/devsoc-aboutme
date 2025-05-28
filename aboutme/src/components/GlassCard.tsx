import React, { useEffect, useRef, useState } from 'react'
import ArrowIcon from "../assets/left-arrow-return-svgrepo-com.svg"

function GlassCard() {
  // prolly move this into a util hook
  const [x, setX] = useState(100);
  const [y, setY] = useState(100);
  const [dragging, setDragging] = useState<boolean>(false);
  const offsetRef = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const dragHandler = (event) => {
      if (dragging) {
        const xPos = event.clientX - offsetRef.current.x;
        const yPos = event.clientY - offsetRef.current.y;
        if (xPos >= 0 && xPos < window.innerWidth - (window.innerWidth * 0.5)) setX(xPos);
        if (yPos >= 0 && yPos < window.innerHeight - (window.innerHeight * 0.6)) setY(yPos);
      }
    }
    window.addEventListener("mousemove", dragHandler);
    return () => window.removeEventListener("mousemove", dragHandler);
  }, [dragging])

  const [onDisplay, setOnDisplay] = useState(false);

  if (!onDisplay) {
    return (
      <img
        src={ArrowIcon}
        className='h-[50px] w-[50px] absolute bottom-[50%] right-0 mr-[15px] border rounded-full p-3 bg-gray-50 hover:cursor-pointer'
        onClick={() => setOnDisplay(true)}
      />
    )
  }

  return (
    <div 
      className='flex flex-col w-[50vw] h-[60vh] border border-gray-300 z-0 select-none'
      style={{
        position: 'absolute',
        top: `${y}px`,
        left: `${x}px`,
      }}
    >
      <div 
        className='flex flex-row justify-between items-center gap-0 bg-gray-300 p-5 pt-0 pb-0 flex-1 '
        onMouseDown={(event) => {
          offsetRef.current = {
            x: event.clientX - x,
            y: event.clientY - y,
          };
          setDragging(true)
        }}
        onMouseUp={() => setDragging(false)}
      >
        <div className='font-bold text-2xl'>About Me</div>
        <div
          className='hover:cursor-pointer'
          onClick={() => setOnDisplay(false)}
        >
          X
        </div>
      </div>
      <div className='bg-gray-100 flex-7 p-5'>
        <p>Description should go here!!!</p>
        <p>Description should go here!!!</p>
      </div>
    </div>
  )
}

export default GlassCard