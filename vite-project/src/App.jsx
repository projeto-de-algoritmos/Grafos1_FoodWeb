import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Header from './components/Header'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Header/>
    </div>
  )
}

export default App
