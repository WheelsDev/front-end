import { useState } from 'react'
import AccessScreen from './components/AccessScreen'
import HomeScreen from './components/HomeScreen'
import TableDBBike from './components/TableDBBike'
import TableDBCustomers from './components/TableDBCustomers'
import TableDBContracts from './components/TableDBContracts'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  const handleLoginSuccess = () => {
    console.log("Login successful in App component, setting loggedIn to true")
    setLoggedIn(true)
  }

  return (
    <>
      <TableDBBike />
      {/* {!loggedIn ? <AccessScreen onLoginSuccess={handleLoginSuccess} /> : <HomeScreen />} */}
    </>
  )
}

export default App