import { useNavigate } from "react-router-dom"

type vehicleActionsProps = {
    vehicleId: number
}

export default function VehicleActions({ vehicleId }: vehicleActionsProps) {
    const navigate = useNavigate()

    return (
        <div className="bg-white rounded-xl">
            <h2 className="uppercase font-bold text-dark-blue-night p-5">Panel de acciones</h2>
            <div className="flex flex-col space-y-3 px-5 py-3">
                <div className="bg-dark-blue-night text-white text-sm hover:bg-slate-700 hover:cursor-pointer transition-colors uppercase font-bold w-fit p-3 rounded-lg">
                    Registrar consumos
                </div>
                <div className="bg-dark-blue-night text-white text-sm hover:bg-slate-700 hover:cursor-pointer transition-colors uppercase font-bold w-fit p-3 rounded-lg" onClick={() => navigate(`/update-documents/${vehicleId}`)}>
                    Actualizar documentación
                </div>
                <div className="bg-dark-blue-night text-white text-sm hover:bg-slate-700 hover:cursor-pointer transition-colors uppercase font-bold w-fit p-3 rounded-lg">
                    Anotar mantenimientos
                </div>
                <div className="bg-dark-blue-night text-white text-sm hover:bg-slate-700 hover:cursor-pointer transition-colors uppercase font-bold w-fit p-3 rounded-lg">
                    Editar datos del vehículo
                </div>
            </div>
        </div>
    )
}
