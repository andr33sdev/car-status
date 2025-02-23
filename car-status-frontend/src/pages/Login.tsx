import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FormLogin from '../components/FormLogin'

export default function Login() {

  const navigate = useNavigate()

  useEffect(() => {
    // Si ya hay un token en localStorage, redirigir al usuario a /home
    if (localStorage.getItem('token')) {
      navigate('/home')
    }
  }, [navigate])

  return (
    <div className='flex flex-col justify-center items-center'>
      <img src="/my-car-status-logo.png" alt="my car status logo" className='mb-14 w-72' />
      <FormLogin />
    </div>
  )
}
