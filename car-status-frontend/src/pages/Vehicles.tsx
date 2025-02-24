import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getVehicles, VehicleResponse } from "../services/vehicleService"
import { VehicleContext } from "../context/VehiclesContext"
import CarCard from "../components/CarCard"

export default function Vehicles() {

    const [vehicles, setVehicles] = useState<VehicleResponse[]>([])
    const { dispatch } = useContext(VehicleContext)

    const getAllVehicles = async () => {
        const data = await getVehicles()
        setVehicles(data ?? []);
        dispatch({ type: 'CREATE_VEHICLE', payload: { vehicle: data } })
    }

    useEffect(() => {
        getAllVehicles()
    }, [])

    return (
        <div className="p-5 space-y-10">
            {vehicles.length === 0 ? (
                <p>Aún no has cargado vehículos</p>
            ) : (
                <>
                    <h1 className="mt-5">Estos son tus vehículos registrados</h1>
                    <div className="grid grid-cols-4 gap-8">
                        {vehicles.map((vehicle) => (
                            <Link to={`/vehicles/${vehicle.id}`} key={vehicle.id}>
                                <CarCard
                                    id={vehicle.id}
                                    brand={vehicle.brand}
                                    model={vehicle.model}
                                    year={vehicle.year}
                                    license_plate={vehicle.license_plate}
                                />
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
