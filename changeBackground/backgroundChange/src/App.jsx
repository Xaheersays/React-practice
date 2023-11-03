import { useState } from 'react'
import './App.css'







function App() {
  const [color, setColor] = useState("olive");
  

  return (
    
    <div className='w-full h-screen duration-200'
    style={{backgroundColor:color}}
    >
      <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
        <div className='flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-full'>
          <button onClick={()=>setColor("red")} className='outline-none px-4 py-1 rounded-full text-white h-10 shadow-lg w-25' style ={{backgroundColor:"red"}}
          >red</button>
          <button onClick={()=>setColor("green")} className='outline-none w-25 px-4 py-1 rounded-full text-white h-10 shadow-lg ' style ={{backgroundColor:"green"}}
          >green</button>
          <button onClick={()=>setColor("blue")} className='outline-none px-4 py-1 rounded-full text-white h-10 shadow-lg w-25' style ={{backgroundColor:"blue"}}
          >blue</button>
          <button onClick={()=>setColor("black")} className='outline-none px-4 py-1 rounded-full text-white h-10 shadow-lg w-25' style ={{backgroundColor:"black"}}
          >black</button>
          <button onClick={()=>setColor("lavender")} className='outline-none px-4 py-1 rounded-full text-white h-10 shadow-lg w-25' style ={{backgroundColor:"lavender"}}
          >lavender</button>
          <button onClick={()=>setColor("brown")} className='outline-none px-4 py-1 rounded-full text-white h-10 shadow-lg w-25' style ={{backgroundColor:"brown"}}
          >brown</button>
          <button onClick={()=>setColor("pink")} className='outline-none px-4 py-1 rounded-full text-white h-10 shadow-lg w-25' style ={{backgroundColor:"pink"}}
          >pink</button>
          <button onClick={()=>setColor("violet")} className='outline-none px-4 py-1 rounded-full text-white h-10 shadow-lg w-25' style ={{backgroundColor:"violet"}}
          >violet</button>
        </div>
      </div>
    </div>
  
  )
}

export default App
