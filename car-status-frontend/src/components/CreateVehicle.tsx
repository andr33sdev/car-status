import { useState, useContext } from "react"
import { VehicleContext } from "../context/VehiclesContext"
import { registerVehicle } from "../services/vehicleService"

export default function CreateVehicle() {
    const { dispatch } = useContext(VehicleContext) // Obtenemos el dispatch del Context
    const [formData, setFormData] = useState({ brand: '', model: '', year: 0, license_plate: '' })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: name === 'year' ? Number(value) : value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Hacer la solicitud POST al backend para registrar al usuario
        console.log(formData)
        const data = await registerVehicle(formData)
        if (data) {
            dispatch({ type: 'CREATE_VEHICLE', payload: { vehicle: data.vehicle } })
            setFormData({ brand: '', model: '', year: 0, license_plate: '' }) // Reiniciamos el formulario
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mx-auto"
        >
            <h2 className="text-2xl font-semibold text-center mb-8 text-slate-800">Carga tu vehículo</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Marca</label>
                <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Modelo</label>
                <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Año</label>
                <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Patente</label>
                <input
                    type="text"
                    name="license_plate"
                    value={formData.license_plate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-slate-700 hover:bg-slate-800 text-white font-semibold py-2 rounded-lg transition-all cursor-pointer"
            >
                Cargar vehículo
            </button>
        </form>
    )
}
