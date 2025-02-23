import { useParams } from "react-router-dom"

export default function VehicleDetails() {

    const { id } = useParams()

    return (
        <div>VehicleDetails del vehículo con id {id}</div>
    )
}
