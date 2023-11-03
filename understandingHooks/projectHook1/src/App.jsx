import React, { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [Counter, setCounter] = useState(0);

  const addValue = () => {
    if (Counter<20)setCounter(Counter + 1);
  }

  const removeVal = () => {
    if (Counter >= 1) {
      setCounter(Counter - 1);
    }
  }

  useEffect(() => {
    console.log(Counter); // This will log the updated value
  }, [Counter]);

  return (
    <>
      <div>HEADER: {Counter}</div>
      <h1>hey there</h1>
      <h2>Counter Value: {Counter}</h2>
      <button onClick={addValue}>add Value</button>
      <hr></hr>
      <button onClick={removeVal}>remove value</button>
      <div>footer: {Counter}</div>
    </> 
  )
}


export default App
