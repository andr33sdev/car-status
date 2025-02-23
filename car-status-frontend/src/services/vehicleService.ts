import { Vehicle } from "../types"

export type VehicleResponse = {
    id?: number,
    brand: string,
    model: string,
    year: number,
    license_plate: string
}

// Función para registrar un usuario
export const registerVehicle = async (formData: Vehicle): Promise<Vehicle | null> => {
    const token = localStorage.getItem('token')

    try {
        const response = await fetch('https://car-status.up.railway.app/api/create-user-vehicle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })

        const data = await response.json()

        if (!response.ok) {
            console.error('Error al registrar el vehículo:', data.msg)
            return null
        }

        return data // Devuelve el user y el token si la solicitud es exitosa

    } catch (error) {
        console.error('Error en la solicitud:', error)
        return null
    }
}

export const getVehicles = async (): Promise<Vehicle[] | null> => {
    const token = localStorage.getItem('token')
    try {
        const response = await fetch('https://car-status.up.railway.app/api/get-user-vehicles', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json()
        if (!response.ok) {
            console.error('Error al obtener los vehículos:', data.msg)
            return null
        }

        return data // Devuelve los vehículos asociados al usuario

    } catch (error) {
        console.error('Error en la solicitud:', error)
        return null
    }
}