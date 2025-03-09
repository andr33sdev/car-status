import { Request, Response } from 'express';
import VehicleDocuments from '../models/VehicleDocuments';
import Vehicle from '../models/Vehicle';

export const getVehicleDocumentsById = async (req: Request, res: Response) => {
    try {
        const { vehicleId } = req.params;
        // Ordenar por `id` o `createdAt` para obtener el último documento
        const documents = await VehicleDocuments.findOne({
            where: { vehicle_id: vehicleId },
            order: [['id', 'DESC']] // Esto asegurará que obtienes el documento más reciente
        });

        if (!documents) {
             res.status(404).json({ message: 'Documentos no encontrados' });
        }

        res.json(documents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los documentos' });
    }
};

export const createAndUpdateVehicleDocuments = async (req: Request, res: Response) => {
    try {
        const { vehicle_id, fire_extinguisher_expiry, vtv_expiry, insurance_expiry, license_plate_expiry } = req.body;
        // Verificar si el vehículo existe
        const vehicle = await Vehicle.findByPk(vehicle_id)
        if (!vehicle) {
            res.status(400).json({ message: 'Vehículo no encontrado' })
        }

        // Crear o actualizar documentos
        const [documents, created] = await VehicleDocuments.upsert({
            vehicle_id,
            fire_extinguisher_expiry,
            vtv_expiry,
            insurance_expiry,
            license_plate_expiry
        })

        res.status(created ? 201 : 200).json({ message: created ? 'Documentos creados' : 'Documentos actualizados', documents })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al guardar los documentos' })
    }
}