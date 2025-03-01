import { useState, useContext } from "react";
import { VehicleContext } from "../context/VehiclesContext";
import { registerVehicle } from "../services/vehicleService";
import carData from "../db/carData.ts";
import { Vehicle } from "../types/index.ts";

console.log("carData:", carData);


export default function CreateVehicle() {
    const { dispatch } = useContext(VehicleContext);
    const [formData, setFormData] = useState<Vehicle>({
        brand: "",
        model: "",
        year: 0,
        license_plate: "",
        image: "" // Nueva propiedad para la imagen
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            let updatedData = {
                ...prev,
                [name]: name === "year" ? Number(value) || "" : value,
            }

            return updatedData;
        })
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = await registerVehicle(formData)
        if (data) {
            dispatch({ type: "CREATE_VEHICLE", payload: { vehicle: data } })
            setFormData({ brand: "", model: "", year: 0, license_plate: "", image: "" })
        }
    }

    return (
        <div className="w-screen flex flex-row">
            <div className="bg-white-elegant w-1/2 flex items-center justify-center h-full">
                {/* 📌 Mostramos la imagen del auto seleccionado */}
                {formData.image ? (
                    <img src={formData.image} alt={formData.model} className="w-xl" />
                ) : (
                    <img src="/car-garage.png" alt="Default" className="w-xl" />
                )}
            </div>

            <div className="bg-white shadow-lg w-1/2">
                <h2 className="text-2xl w-1/2 mx-auto font-bold border-b-2 border-dark-blue-night pb-4 uppercase text-center mt-30 mb-15 text-dark-blue-night">
                    ¡Agrega los datos de tu auto para un mejor seguimiento!
                </h2>
                <form onSubmit={handleSubmit} className="text-dark-blue-night w-1/2 m-auto">
                    <div className="mb-4">
                        <label className="block uppercase text-dark-blue-night font-bold mb-2">Marca</label>
                        <select
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-xanthous-500"
                        >
                            <option value="">Selecciona una marca</option>
                            {Object.keys(carData).map((brand) => (
                                <option key={brand} value={brand}>{brand}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block uppercase text-dark-blue-night font-bold mb-2">Modelo</label>
                        <select
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            disabled={!formData.brand}
                            className="w-full p-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-xanthous-500"
                        >
                            <option value="">Selecciona un modelo</option>
                            {formData.brand && carData[formData.brand].map((model) => (
                                <option key={model} value={model}>{model}</option>
                            ))}
                        </select>

                    </div>
                    <div className="mb-4">
                        <label className="block uppercase text-dark-blue-night font-bold mb-2">Año</label>
                        <input
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-xanthous-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block uppercase text-dark-blue-night font-bold mb-2">Patente</label>
                        <input
                            type="text"
                            name="license_plate"
                            value={formData.license_plate}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-xanthous-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full uppercase font-bold shadow-md bg-xanthous-500 text-dark-blue-night hover:bg-dark-blue-night hover:text-white mt-5 py-3 rounded-2xl transition-all cursor-pointer"
                    >
                        Cargar vehículo
                    </button>
                </form>
            </div>
        </div>
    );
}
