import { useState } from 'react'

type TabIconProps = {
  source: string;
  tooltip: string;
  onClick: () => void;
}

function TabIcon({ source, tooltip, onClick}: TabIconProps) {
  const [display, setDisplay] = useState(false);

  return (
    <div className='relative'>
      {display && (
        <div className='z-50 absolute top-[-20px] left-10 bg-white border-1 border-black w-[100px] p-1'>
          {tooltip}
        </div>
      )}
      <img
        className='h-[35px] hover:cursor-pointer hover:opacity-50 '
        src={source}
        onMouseOver={() => setDisplay(true)}
        onMouseLeave={() => setDisplay(false)}
        onClick={onClick}
      />
    </div>
  )
}

export default TabIcon