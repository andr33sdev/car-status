// src/routes/vehicleRoutes.ts
import express from 'express';
import { createVehicle, getUserVehicleById, getUserVehicles } from '../controllers/vehicleController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/api/create-user-vehicle', authMiddleware, createVehicle);
router.get('/api/get-user-vehicles', authMiddleware, getUserVehicles);
router.get('/api/get-user-vehicle/:id', authMiddleware, getUserVehicleById);

export default router;
