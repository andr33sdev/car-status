import { Router } from "express";
import { createUser } from "../controllers/userController";

const router = Router()

// Ruta para crear un nuevo usuario
router.post('/api/users', createUser)

export default router