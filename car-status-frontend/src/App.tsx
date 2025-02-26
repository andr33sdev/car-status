import Register from "./pages/Register"
import Login from "./pages/Login"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import PrivateRoute from "./components/PrivateRoute"
import Dashboard from "./components/Dashboard"
import Vehicles from "./pages/Vehicles"
import VehicleDetails from "./pages/VehicleDetails"
import CreateVehicle from "./pages/CreateVehicle"

function App() {

  return (
    <div className="bg-dun-500">
      <Dashboard>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/create-vehicle" element={<PrivateRoute><CreateVehicle /></PrivateRoute>} />
          <Route path="/vehicles" element={<PrivateRoute><Vehicles /></PrivateRoute>} />
          <Route path="/vehicles/:id" element={<PrivateRoute><VehicleDetails /></PrivateRoute>} />
        </Routes>
      </Dashboard>
    </div>
  )
}

export default App
