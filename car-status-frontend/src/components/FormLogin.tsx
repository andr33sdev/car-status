import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Login() {
    const navigate = useNavigate() // Para redirigir después del login exitoso
    const { dispatch } = useContext(AuthContext) // Obtenemos el dispatch del Context
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Hacer la solicitud POST al backend para loguear al usuario
        try {
            const response = await fetch('https://car-status.up.railway.app/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (response.ok) {
                // Si el login es exitoso, guardamos el token y el usuario en el Context
                localStorage.setItem('token', data.token) // Y en el localStorage también lo guardamos
                // Aquí usamos el dispatch del context para guardar el usuario y el token
                dispatch({
                    type: 'SET_USER',
                    payload: { user: data.user, token: data.token }
                })

                // Redirigir al usuario al dashboard o página principal
                navigate('/home') // O a la página que desees

                console.log('Usuario logueado:', data)
            } else {
                // Si la respuesta no es exitosa, mostrar el error
                console.error('Error al iniciar sesión:', data.msg)
            }

        } catch (error) {
            console.error('Error en la solicitud:', error)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mx-auto"
        >
            <h2 className="text-2xl font-semibold text-center mb-8 text-slate-800">Introduce los datos de tu cuenta</h2>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Correo electrónico</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700 transition-all"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Contraseña</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700 transition-all"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-slate-700 hover:bg-slate-800 text-white font-semibold py-2 rounded-lg transition-all cursor-pointer"
            >
                Ingresar
            </button>
        </form>

    )
}
