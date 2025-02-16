
export interface RegisterData { // Interface de lo que vamos a enviar a través del form
    username: string
    email: string
    password: string
}

export interface RegisterResponse { // Interface de lo que recibimos en caso de solicitud exitosa
    token: string
    user: object
}

// Función para registrar un usuario
export const registerUser = async (formData: RegisterData): Promise<RegisterResponse | null> => {
    try {
        const response = await fetch('https://zentra-production.up.railway.app/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })

        const data = await response.json()

        if (!response.ok) {
            console.error('Error al registrar el usuario:', data.msg)
            return null
        }

        return data // Devuelve el user y el token si la solicitud es exitosa

    } catch (error) {
        console.error('Error en la solicitud:', error)
        return null
    }
} 