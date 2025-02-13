import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./database"; // Asegúrate de que este archivo exista y tenga la conexión a PostgreSQL

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("Backend funcionando correctamente en Railway 🚀");
});

// Conectar a la base de datos
sequelize.authenticate()
    .then(() => console.log("Conexión a la base de datos exitosa"))
    .catch(err => console.error("Error al conectar la base de datos:", err));

// Escuchar en el puerto asignado por Railway
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
