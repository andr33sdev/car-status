import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function Home() {

  const { state } = useContext(AuthContext)

  return (
    <div className='flex flex-col pl-20 pt-20 h-screen w-screen'>
      <h1>Bienvenido {state.user.username}</h1>
    </div>
  )
}