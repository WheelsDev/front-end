import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AccessScreen from "./components/AccessScreen";
import HomeScreen from "./components/HomeScreen";
import TableDBBike from "./components/TableDBBike";
import TableDBCustomers from "./components/TableDBCustomers";
import TableDBContracts from "./components/TableDBContracts";
import NewRegister from "./components/NewRegister";
import ConcludeContractScreen from "./components/ConcludeContractScreen";


function ProtectedRoute({ children, loggedIn }) {
  return loggedIn ? children : <Navigate to="/" />;
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    console.log("Login successful in App component, setting loggedIn to true");
    setLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? <Navigate to="/home" /> : <AccessScreen onLoginSuccess={handleLoginSuccess} />
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <HomeScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/novo-aluguel"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <NewRegister />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contratos"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <TableDBContracts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bicicletas"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <TableDBBike />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clientes"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <TableDBCustomers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/concluir-contrato/:contratoId"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <ConcludeContractScreen />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={loggedIn ? "/home" : "/"} />} />
      </Routes>
    </Router>
  );
}

export default App;
