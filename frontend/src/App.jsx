import { useState } from 'react'
import PhrasePractice from './pages/PhrasePractice'
import { Header } from './components/organism/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <PhrasePractice />
    </div>
  )
}

export default App
