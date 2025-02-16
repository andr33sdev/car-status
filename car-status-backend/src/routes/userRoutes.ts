import { Router } from "express";
import { getUser, createUser } from "../controllers/userController";

const router = Router()

// Ruta para obtener un usuario por ID
router.get("/api/users/:id", getUser);

// Ruta para crear un nuevo usuario
router.post('/api/users', createUser)

export default router
