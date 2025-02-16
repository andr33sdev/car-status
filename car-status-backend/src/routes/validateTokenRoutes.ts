import { Router } from "express";
import { validateToken } from "../controllers/validateTokenController";

const router = Router()

// Ruta para validar token
router.post('/api/validate-token', validateToken)

export default router