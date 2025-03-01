import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from 'body-parser';
import sequelize from "./database"; // Asegúrate de que este archivo exista y tenga la conexión a PostgreSQL
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import validateTokenRoutes from './routes/validateTokenRoutes'
import authMiddleware from "./middlewares/authMiddleware";
import vehicleRoutes from "./routes/vehicleRoutes"
import vehicleDocumentsRoutes from "./routes/vehicleDocumentsRoutes"

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Middleware para parsear el cuerpo de la solicitud
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ruta de prueba
app.get("/", authMiddleware, (req, res) => {
    res.send("Ruta protegida: acceso autorizado 🚀");
});

// Usar las rutas de usuarios
app.use(userRoutes);

// Usar las rutas de auth
app.use(authRoutes);

// usar las rutas de vehicles
app.use(vehicleRoutes);

// usar las rutas de vehicles documents
app.use(vehicleDocumentsRoutes);

// Validación a través de JWT para rutas protegidas (componente PrivateRoute.tsx)
app.use(validateTokenRoutes)

// Conectar a la base de datos
sequelize.authenticate()
    .then(() => console.log("Conexión a la base de datos exitosa"))
    .catch(err => console.error("Error al conectar la base de datos:", err));

// Escuchar en el puerto asignado por Railway
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
