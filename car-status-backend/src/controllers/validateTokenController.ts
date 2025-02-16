import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const validateToken = (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Token no proporcionado' })
            return
        }

        const token = authHeader.split(' ')[1] // Extrae el token después de "Bearer"
        const secretKey = process.env.JWT_SECRET as string

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: 'Token inválido o expirado' })
                return
            }
            res.status(200).json({ message: 'Token válido', user: decoded })
            return
        })
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' })
        return
    }
}