# React-practice
### most important 
- when we use useCallback to stop rerendering of child if parent rerenders


In a React application, the initial render is the first time that the component tree is rendered to the DOM. It happens when the application first loads, or when the root component is first rendered. This is also known as "mounting" the components.

Re-renders, on the other hand, happen when the component's state or props change, and the component needs to be updated in the DOM to reflect these changes. React uses a virtual DOM to optimize the process of updating the actual DOM, so that only the necessary changes are made.

There are a few ways that you can trigger a re-render in a React component:

By changing the component's state or props. When the component's state or props change, React will re-render the component to reflect these changes.

When the parent element re-renders, even if the component's state or props have not changed.


### General Rules of Hooks & take aways 
starts with "use" (both -react and custom hooks)
component must be uppercase
invoke inside function/component body
don't call hooks conditionally (cover later)=> making hook inside a if block
set functions don't update state immediately (cover later)=> they are asynchronous 
-so when u immediately console it,it displays old data only becoz of its asynchronous nature...
-which means that we use useEffect hook to get the updated values 
-remember the batch updates which helps to optimize(re-rendering only single time)


### jsx tips
- i cant directly show objects {id:1,name:"a"} directly on browser but i can directly display arrays/string so oftenly we use obj.map()

```js
03-useState-array.jsx?t=1699252853992:23 Warning: Each child in a list should have a unique "key" prop.

Check the render method of `UseStateArray`. See https://reactjs.org/link/warning-keys for more information.
```
this shit happens becoz we must have a key(unique) associated with each object react uses them for optimization
optimization-->? react while reconcilation uses this key to check if thats present or not ,if not then updates dom

# imp note
-the data flows from Parent Component to Child Component pretty much js Lexical Scoping comes into the picture 
-we can pass data from one paren comp  to its child but cant do vice versa

# conditional rendering
```jsx
function f(){
    let boolean = true;
    return(                                             
        {boolean && <Component/>} evaluates to if boolean(which is true) we go to other condtion which directly renders the Component
    )
}
```

## useEffect(callBack,[])
when this depencdency empty array is passed it means to  run useEffect only of first render and since there are no dependencies so none of states variables affects it
-to be specific empty array means when our component is mounted and unmounted  which include(reloading page )
## useEffect(callBack)
- this means to run useEffect on every mount( initail render ),change of props 

## useEffect
we can pass props also 
-when we had some dependency in array it means run it on mount unmount and change in dependency(which is not the case here)

## useEffect memory leaks
```jsx
import React, {useState, useEffect} from 'react';
const Timer = (props) => {
    const {customText} = props
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            console.log("I am running setInterval")
            setCounter((prevCounter) => prevCounter + 1)
        }, 1000)
        console.log("creater interval with id ", interval)
        // clean up
        return () => {
            console.log("i was unmounted")
            console.log("removing interval with id ", interval)
            clearInterval(interval)
        }

    }, [])

    useEffect(() => {
        // clean up

        return () => {
            console.log("cleaning up 2nd effect for customText")
        }
    }, [customText])

    useEffect(() => {
        console.log("i am rendering again and again")
        // clean up

        return () => {
            console.log("cleaning up 3rd effect for customText")
        }
    })
    return <>
    <span>Current time is: {counter}</span>
    <br/>
    <span>{customText}</span>
    <br/>
    {/* <button onClick={startTimer}>Start Timer</button> */}
    </>
}
```
# blog to understand the cleanup fucntion [hhttps://medium.com/@vishalkalia.er/what-is-the-useeffect-cleanup-function-and-how-it-works-83d8c67a1a10]

# writing cleanup function in useEffect
```jsx

useEffect(() => {
  getUser(userId).then((user) => {
    setUser(user)
  })

  // Cleanup Function: Called when we unmount or dependency changes
  return () => {}
}, [userId])

```
### vvvimp tip
whenever we unmount or props/dependency changes  we get a chance to execute return statement, we can do any thing here so 
especially we use cleanup functions
when the component unmounts from other components or anywhere the return statement inside <b> all of the useState present inside removed Component </b> gets executed wheather the useEffect has dependecy of empty array [] or no dependecy

```jsx

const [win,setWin] = useState(window.screen.width)
const setWindowWidth =( )=>{
    setWin(window.innerWidth);
}

useEffect(() => {
    window.addEventListener('resize',setWindowWidth)
  return () => {
        window.removeEventListener('resize',setWindowWidth)
})

this is best example [remember the steps]
see the steps:
1) first time the component rendered(mounted) which fires useEffect
2) inside it we add eventListener to window
3) now the event is handled by `setWindowWidth` which does setWin(window.innerWidth); sets width asynchronously 
    (dont know how much time  does it takes)
4) this above part is now completed 
5) now the component rerenders since we had updated the value of state [win]
6) now we havent passed any array which causes useEffect to run on every render 
7) and we know that useEffect's return statements are executed when the dependencies changes or when component unmounts 
8) so this clean up causes remove of the event which saves memory leaks or wastage of memory
9) since now component has rendered the useEffect has once again added an event to window
```


## useRef  hook  
```jsx
const App = () => {
    let myLocal = 0
    console.log("myLocal", myLocal)
    const ref = useRef(0)
    const [myCount, setCount] = useState(0)
    console.log("ref.current", ref.current)

    const inputRef = useRef(null)

    return <>
    <button onClick={() => {myLocal+= 1}}>Change local variable</button>
      <button onClick={() => {ref.current += 1}}>Change ref</button>
      <button onClick={() => {setCount((prevCount) => prevCount + 1)}}>Change state</button>

      <div>
        <span>Local var: {myLocal}</span><br/>
        <span>ref: {ref.current}</span><br/>
        <span>state variable: {myCount}</span><br/>
      </div>
      </>
}
```

- useRef doesnt even render something but it preserves value between previous render and next render
- changeing ref doesnt causes render but the changes are also updated when component renders 
- ref.current gives u current value of the thing on which we have defined the ref
  this way we reference it <span>ref: {ref.current}</span><br/>
- which is different from local variables from resetting the value after render 
- we use useRef also for manipulating the content of web page

# useRef on Timer example when we dont unmount
```jsx
    const [counter,setCounter] = useState(0)
    const interval = useRef(null)
    useEffect(() => {
        interval.current = setInterval(()=>{
            console.log("i am running")
            setCounter(p=>p+1)
            
        },1000)
        return ()={clearInterval(interva.current)}
    },[])

    const stopTimer = () => {
        console.log("stopping timer for id ", interval.current)
        clearInterval(interval.current)
    }

```
why cant we do 
```jsx
let interval ;
useEffect(() => {
    interval = setInterval(()=>{
        console.log("i am running")
        setCounter(p=>p+1)

    },1000)
    return ()={clearInterval(interva.current)}
},[])

const stopTimer = () => {
    console.log("stopping timer for id ", interval)
    clearInterval(interval)
}
```
- naah we cant do like above becoz inside useEffect we are having setCounter which causes rerender after every second
- which on render sets `interval` to again undefined before clicking stop timer button;

why first one runs?
- we has reference of interval even if the component is rendering every second
- when we click the stop timer we has refernce of `interval` inside `interval` obj as `interval.current` which useRef has helped to vanish again and again on every render


# useRef used for manipulation 
```jsx
cont SomeComp = ()=>{
    ref = useRef(null)
    return(
        <>
        <Input ref={ref} data={p:"x"} />
        </>
    )
}
here the above ref is recived from forwardref and we gets props too
import React, {forwardRef } from 'react';
const Input = forwardRef((props, ref) => {
    console.log("input box props are: ", props)
    return <input ref={ref} type="text"/>
})

export default Input

```
