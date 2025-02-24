// src/controllers/vehicleController.ts
import { Request, Response } from 'express';
import { AuthRequest } from "../middlewares/authMiddleware"; // Asegúrate de importar correctamente AuthRequest
import Vehicle from '../models/Vehicle';

export const createVehicle = async (req: AuthRequest, res: Response) => {
    try {
        const { brand, model, year, license_plate } = req.body;

        // Asegúrate de que user_id sea convertido a number si es necesario
        const user_id = (req.user as { id: string }).id; // Esto debería estar bien si es un string, pero vamos a asegurarnos de convertirlo a number si es necesario.

        if (!brand || !model || !year || !license_plate) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return
        }

        // Convertimos el id a un número (si es necesario)
        const newVehicle = await Vehicle.create({
            user_id: Number(user_id), // Aseguramos que el user_id sea de tipo number
            brand,
            model,
            year,
            license_plate
        });

        res.status(201).json(newVehicle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el vehículo' });
    }
};

export const getUserVehicles = async (req: Request, res: Response) => {
    try {
        const user_id = (req as any).user.id;
        const vehicles = await Vehicle.findAll({ where: { user_id } });

        res.status(200).json(vehicles);
        return
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los vehículos' });
        return
    }
};

export const getUserVehicleById = async (req: Request, res: Response) => {
    try {
        const user_id = (req as any).user.id // ID del usuario autenticado
        const { id } = req.params // ID del vehículo a buscar

        // Buscar el vehículo asegurando que pertenezca al usuario autenticado
        const vehicle = await Vehicle.findOne({
            where: { id, user_id }
        })

        if (!vehicle) {
            res.status(404).json({ message: 'Vehículono encontrado o no autorizado' })
        }

        res.status(200).json(vehicle)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al obtener el vehículo' })
    }
}
