import { Router } from "express"
import { check } from 'express-validator'
import { register, login } from '../controllers/authController'

const router = Router()

router.post(
    "/api/register",
    [
        check("username", "El nombre de usuario es obligatorio").not().isEmpty(),
        check("email", "Ingresa un email válido").isEmail(),
        check("password", "La contraseña debe tener al menos 6 caracteres").isLength({ min: 6 }),
    ],
    register
)

router.post(
    "/api/login",
    [
        check("email", "Ingresa un email válido").isEmail(),
        check("password", "La contraseña es obligatoria").not().isEmpty(),
    ],
    login
)

export default router