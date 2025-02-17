import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extendemos la interfaz Request para incluir la propiedad user
export interface AuthRequest extends Request {
    user?: { id: string }; // Suponiendo que el payload del token tiene un campo `id`
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Acceso denegado, token no proporcionado" });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        // Suponiendo que el payload contiene un campo `id`
        req.user = { id: decoded.id };  // Almacenamos el id del usuario en `req.user`

        next(); // Llamamos a next() para pasar al siguiente middleware
    } catch (error) {
        res.status(401).json({ message: "Token inválido" });
        return;
    }
};

export default authMiddleware;
