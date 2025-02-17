// src/routes/vehicleRoutes.ts
import express from 'express';
import { createVehicle, getUserVehicles } from '../controllers/vehicleController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/api/create-user-vehicle', authMiddleware, createVehicle);
router.get('/api/get-user-vehicles', authMiddleware, getUserVehicles);

export default router;
