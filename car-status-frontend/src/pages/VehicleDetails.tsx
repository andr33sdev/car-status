import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Vehicle = {
    id: number;
    name: string;
    brand: string;
    model: string;
    year: number;
};

export default function VehicleDetails() {
    const token = localStorage.getItem('token')
    const { id } = useParams();
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const response = await fetch(`https://car-status.up.railway.app/api/get-user-vehicle/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
                if (!response.ok) throw new Error("Vehículo no encontrado");
                const data = await response.json();
                setVehicle(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicle();
    }, [id]);

    if (loading) return <p>Cargando...</p>;
    if (!vehicle) return <p>Vehículo no encontrado.</p>;

    return (
        <div>
            <h1>{vehicle.name}</h1>
            <p>Marca: {vehicle.brand}</p>
            <p>Modelo: {vehicle.model}</p>
            <p>Año: {vehicle.year}</p>
        </div>
    );
}
