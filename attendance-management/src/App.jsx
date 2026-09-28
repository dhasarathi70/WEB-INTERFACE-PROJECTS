import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Attendance from './Attandance'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <Attendance/>
    </>
);
}
export default App;

