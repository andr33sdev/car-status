
type VehicleDocumentsProps = {
    documents: {
        fire_extinguisher_expiry?: string;
        vtv_expiry?: string;
        insurance_expiry?: string;
        license_plate_expiry?: string;
    } | null
};

export default function VehicleDocuments({ documents }: VehicleDocumentsProps) {
    return (
        <div className="bg-white rounded-xl">
            <h2 className="uppercase font-bold text-dark-blue-night p-5">Documentación</h2>
            <div className="grid grid-cols-2 grid-rows-2 gap-5 p-5 w-full">
                <div className="w-full"><span className="font-semibold">Vencimiento Matafuegos</span><p>{documents?.fire_extinguisher_expiry ? documents.fire_extinguisher_expiry : '¡Aún no actualizaste vencimiento de matafuegos!'}</p></div>
                <div className="w-full"><span className="font-semibold">Vencimiento VTV</span><p>{documents?.vtv_expiry ? documents.vtv_expiry : '¡Aún no actualizaste vencimiento de VTV!'}</p></div>
                <div className="w-full"><span className="font-semibold">Vencimiento Seguro</span><p>{documents?.insurance_expiry ? documents.insurance_expiry : '¡Aún no actualizaste vencimiento del seguro!'}</p></div>
                <div className="w-full"><span className="font-semibold">Vencimiento Patente</span><p>{documents?.license_plate_expiry ? documents.license_plate_expiry : '¡Aún no actualizaste vencimiento de patente!'}</p></div>
            </div>
        </div>
    )
}
