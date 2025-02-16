import Register from "./pages/Register"
import Login from "./pages/Login"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import PrivateRoute from "./components/PrivateRoute"

function App() {

  return (
    <div className="bg-gray-50">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      </Routes>
    </div>
  )
}

export default App
