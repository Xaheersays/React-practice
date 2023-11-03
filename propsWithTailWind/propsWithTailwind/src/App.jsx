import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/card'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <h1 className='bg-green-400 text-black p-8 rounded-2xl mb-4'>Tailwind</h1>
      <Card compName = "headphones"/>
      <Card compName = "earphones"/>
      <Card compName = "airdopes"/>


    </>
  )
}

export default App
