import { Request, Response } from 'express';
import { User } from '../models/User';

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params // Captura el ID de los parámetros de la URL

        // Buscar el usuario en la base de datos
        const user = await User.findByPk(id)

        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" })
        }

        res.status(200).json(user)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
}

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
