import { useState } from 'react'
import Board from './components/Board'
import Tile from './components/Tile'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Board/> */}
      <Tile image="clubs_2"/>
    </>
  )
}

export default App
