import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extendemos la interfaz Request para incluir la propiedad user
interface AuthRequest extends Request {
    user?: string | JwtPayload;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Acceso denegado, token no proporcionado" });
        return;  // 🔹 Importante: aseguramos que la función termine aquí
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = decoded;
        next(); // ✅ Llamamos a next() y terminamos la ejecución correctamente
    } catch (error) {
        res.status(401).json({ message: "Token inválido" });
        return;
    }
};

export default authMiddleware;
