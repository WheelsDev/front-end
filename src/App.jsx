import { useState } from 'react'
import AccessScreen from './components/AccessScreen'
import HomeScreen from './components/HomeScreen'
import TableDB from './components/TableDB'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  const handleLoginSuccess = () => {
    console.log("Login successful in App component, setting loggedIn to true")
    setLoggedIn(true)
  }

  return (
    <>
      <TableDB />
      {/* {!loggedIn ? <AccessScreen onLoginSuccess={handleLoginSuccess} /> : <HomeScreen />} */}
    </>
  )
}

export default App