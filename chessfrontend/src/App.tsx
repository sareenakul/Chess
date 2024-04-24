import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import { Game } from './Pages/Game';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Landing/>}/>
        <Route path="/game" element = {<Game/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
