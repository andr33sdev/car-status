import { Request, Response } from 'express';
import { User } from '../models/User';  // Asegúrate de tener el modelo User

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Faltan campos obligatorios' });
        }

        const user = await User.create({
            username,
            email,
            password,
        });

        return res.status(201).json({
            message: 'Usuario creado con éxito',
            user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al crear usuario' });
    }
};
