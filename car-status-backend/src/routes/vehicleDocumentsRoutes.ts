import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { getVehicleDocumentsById, createAndUpdateVehicleDocuments } from '../controllers/vehicleDocumentsController';

const router = Router();

// Obtener losdocumentos de un vehículo por su ID
router.get('/api/vehicle-documents/:vehicleId', authMiddleware, getVehicleDocumentsById)

// Crear o actualizar documentos de un vehículo
router.post('/api/vehicle-documents/', authMiddleware, createAndUpdateVehicleDocuments)

export default router