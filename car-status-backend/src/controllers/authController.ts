import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validationResult } from "express-validator";
import { User } from "../models/User";
import dotenv from 'dotenv'

dotenv.config()

// Función de registro de usuario nuevo
export const register = async (req: Request, res: Response) => {
    // Validar errores de express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    try {
        const { username, email, password } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ msg: "El usuario ya existe" });
            return
        }

        // Hashear contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear usuario
        const newUser = await User.create({ username, email, password: hashedPassword });

        // Crear token
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

        res.status(201).json({ token, user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

// Función de loguin de usuario existente
export const login = async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }

    try {

        const { email, password } = req.body

        // Verificar si el usuario existe
        const user = await User.findOne({ where: { email } })
        if (!user) {
            res.status(400).json({ msg: 'Credenciales inválidas' })
            return
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.password) // Contraseña del req.body contra contraseña guardada en el usuario con dicho email en la BBDD

        if (!isMatch) {
            res.status(400).json({ msg: 'Contraseña inválida' })
            return
        }

        // Crear token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1d" })

        res.json({ token, user })

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: 'Error en el servidor' })
    }
}