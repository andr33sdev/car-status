// src/components/PrivateRoute.tsx
import { ReactNode, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
    children: ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
    const token = localStorage.getItem('token')

    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setIsAuthenticated(false)
                return
            }

            try {
                const response = await fetch ('http://localhost:5000/api/validate-token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                })

                if (response.ok) {
                    setIsAuthenticated(true)
                } else {
                    setIsAuthenticated(false)
                    localStorage.removeItem('token') // Si el token es inválido, lo eliminamos
                }
            } catch (error) {
                console.error('Error al validar el token:', error)
                setIsAuthenticated(false)
            }
        }

        validateToken()
    }, [token])

    if (isAuthenticated === null) {
        return <div className="text-center mt-10">Validando sesión...</div> // Puedes poner un spinner
    }

    return isAuthenticated ? children : <Navigate to="/login" />
}

export default PrivateRoute
