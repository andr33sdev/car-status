

export default function VehicleMaintenance() {
    return (
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
    )
}
