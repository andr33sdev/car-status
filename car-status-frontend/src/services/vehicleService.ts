import { Vehicle } from "../types"

export type VehicleResponse = {
    id?: number,
    brand: string,
    model: string,
    year: number,
    license_plate: string
}

const token = localStorage.getItem('token')

// Función para registrar un usuario
export const registerVehicle = async (formData: Vehicle): Promise<Vehicle | null> => {
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

export const fetchVehicle = async (id: string) => {
    try {
        const response = await fetch(`https://car-status.up.railway.app/api/get-user-vehicle/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error("Vehículo no encontrado");

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener el vehículo:", error);
        return null; // Retorna null para manejar el error en el componente
    }
};
