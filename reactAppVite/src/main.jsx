import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'

function MyApp(){
  return (<h1>this is so cool!</h1>)
} 
const Newobj = {
  type: 'h1',
  props: {
    children: 'this is not so cool !!'
  }
}
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    // <MyApp />
    Newobj
  // </React.StrictMode>,
)
