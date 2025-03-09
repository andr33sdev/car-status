import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchVehicle } from "../services/vehicleService"
import VehicleActions from "../components/VehicleActions";
import VehicleMaintenance from "../components/VehicleMaintenance";
import VehicleDocuments from "../components/VehicleDocuments";
import VehicleConsumptions from "../components/VehicleConsumptions";

type Vehicle = {
    id: number
    name: string
    brand: string
    model: string
    year: number
};

export type VehicleDocuments = {
    fire_extinguisher_expiry: string;
    vtv_expiry: string;
    insurance_expiry: string;
    license_plate_expiry: string;
};

const token = localStorage.getItem('token')

export default function VehicleDetails() {
    const { id } = useParams()
    const [vehicle, setVehicle] = useState<Vehicle | null>(null)
    const [documents, setDocuments] = useState<VehicleDocuments | null>(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return; // Si id es undefined, no hacer la petición

        const getVehicle = async () => {
            setLoading(true);
            try {
                const data = await fetchVehicle(id); // Se espera la respuesta
                setVehicle(data);
            } catch (error) {
                console.error("Error al obtener el vehículo:", error);
                setVehicle(null);
            } finally {
                setLoading(false);
            }
        };

        getVehicle();
    }, [id]);

    useEffect(() => {
        if (!vehicle) return; // Esperar a que vehicle esté definido

        const fetchVehicleDocumentation = async () => {
            try {
                const response = await fetch(`https://car-status.up.railway.app/api/vehicle-documents/${vehicle.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    console.error('Error al intentar obtener documentación:', data.msg);
                    return;
                }
                console.log(data)
                setDocuments(data);
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        };

        fetchVehicleDocumentation();
    }, [vehicle]); // Solo se ejecuta cuando vehicle cambia

    if (loading) return <p>Cargando...</p>
    if (!vehicle) return <p>Vehículo no encontrado.</p>

    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-10 p-10 w-screen">
            <VehicleConsumptions />
            <VehicleDocuments documents={documents} />
            <VehicleMaintenance />
            <VehicleActions vehicleId={vehicle.id} />
        </div>
    )
}
