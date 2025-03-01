import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVehicle } from "../services/vehicleService";

type Vehicle = {
    id: number;
    name: string;
    brand: string;
    model: string;
    year: number;
};

export default function VehicleDetails() {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return; // Si `id` es undefined, no hacer la petición
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

    if (loading) return <p>Cargando...</p>;
    if (!vehicle) return <p>Vehículo no encontrado.</p>;

    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-10 p-10 w-screen">
            <div className="bg-white rounded-xl">
                <h2 className="uppercase font-bold text-dark-blue-night p-5">Consumos</h2>
            </div>
            <div className="bg-white rounded-xl">
                <h2 className="uppercase font-bold text-dark-blue-night p-5">Documentación</h2>
                <div className="grid grid-cols-2 grid-rows-2 gap-5 p-5 w-full">
                    <div className="w-full"><span className="font-semibold">Vencimiento Matafuegos</span><p>4/8/25</p></div>
                    <div className="w-full"><span className="font-semibold">Vencimiento VTV</span><p>2/4/25</p></div>
                    <div className="w-full"><span className="font-semibold">Vencimiento Seguro</span><p>12/3/25</p></div>
                    <div className="w-full"><span className="font-semibold">Vencimiento Patente</span><p>24/2/25</p></div>
                </div>
            </div>
            <div className="bg-white rounded-xl">
                <h2 className="uppercase font-bold text-dark-blue-night p-5">Mantenimientos</h2>
                <div className="grid grid-cols-2 grid-rows-2 gap-5 p-5 w-full">
                    <div className="w-full"><span className="font-semibold">Última revisión presión neumáticos</span><p>Fecha: 4/8/25 | Presión: 30</p></div>
                    <div className="w-full"><span className="font-semibold">Última revisión nivel de aceite</span><p>Fecha: 2/4/25 | Cantidad: </p></div>
                    <div className="w-full"><span className="font-semibold">Última cambio de aceite realizado</span><p>Fecha: 12/3/25 | Aceite: </p></div>
                    <div className="w-full"><span className="font-semibold">Última revisión líquido hidráulico</span><p>Fecha: 24/2/25 | Cantidad: </p></div>
                    <div className="w-full"><span className="font-semibold">Última revisión líquido de frenos</span><p>Fecha: 24/2/25 | Cantidad: </p></div>
                </div>
            </div>
            <div className="bg-white rounded-xl">
                <h2 className="uppercase font-bold text-dark-blue-night p-5">Panel de acciones</h2>
                <div className="flex flex-col space-y-3 px-5 py-3">
                    <div className="bg-dark-blue-night text-white text-sm hover:bg-slate-700 hover:cursor-pointer transition-colors uppercase font-bold w-fit p-3 rounded-lg">Registrar consumos</div>
                    <div className="bg-dark-blue-night text-white text-sm hover:bg-slate-700 hover:cursor-pointer transition-colors uppercase font-bold w-fit p-3 rounded-lg">Actualizar documentación</div>
                    <div className="bg-dark-blue-night text-white text-sm hover:bg-slate-700 hover:cursor-pointer transition-colors uppercase font-bold w-fit p-3 rounded-lg">Anotar mantenimientos</div>
                    <div className="bg-dark-blue-night text-white text-sm hover:bg-slate-700 hover:cursor-pointer transition-colors uppercase font-bold w-fit p-3 rounded-lg">Editar datos del vehículo</div>
                </div>
            </div>
        </div>
    );
}
