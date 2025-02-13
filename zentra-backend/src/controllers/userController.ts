import { Request, Response } from 'express';
import { User } from '../models/User';

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            res.status(400).json({ message: 'Faltan campos obligatorios' });
        }

        const user = await User.create({
            username,
            email,
            password,
        });

        res.status(201).json({
            message: 'Usuario creado con éxito',
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear usuario' });
    }
};
