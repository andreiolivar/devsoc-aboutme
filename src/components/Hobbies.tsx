import ArtWorkA from "../assets/kazamajin4.png";
import ArtWorkB from "../assets/cat.png";
import ArtWorkC from "../assets/white.png";
import ArtWorkD from "../assets/jpB.PNG";

function Hobbies() {
  return (
    <>
      <div className="flex flex-col gap-3 mb-5">
        <p>I used to play basketball back in high school but I really haven't played since then :P</p>
        <p>Though, when I have the time, I like to:</p>
        <ul className='ml-3'>
          <li>- watch movies / shows</li>
          <li>- play guitar</li>
          <li>- draw stuff</li>
        </ul>
        <p>Here are some things I've drawn
          <span className='line-through text-gray-500'> while procastinating on my assignments:</span>
        </p>
      </div>
      <div className='grid grid-cols-2 grid-rows-2 gap-3 justify-center mx-auto items-center w-fit h-fit'>
        <img className='mx-auto h-[20vh] w-auto object-contain' src={ArtWorkB} alt="cat" />
        <img className='mx-auto h-[20vh] w-auto object-contain' src={ArtWorkA} alt="kazama jin" />
        <img className='mx-auto h-[20vh] w-auto object-contain' src={ArtWorkC} alt="white" />
        <img className='mx-auto h-[20vh] w-auto object-contain' src={ArtWorkD} alt="portrait" />
      </div>
    </>
  )
}

export default Hobbies