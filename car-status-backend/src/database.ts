import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_URL!,
    {
        dialect: 'postgres',
        logging: false, // Para evitar que se muestren los logs SQL
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch((error) => {
        console.error('No se pudo conectar a la base de datos:', error);
    });

// Sincronización con la base de datos
sequelize.sync({ force: false }).then(() => { // force: false => significa que no elminará las tablas existentes (si las hubiera)
    console.log('Base de datos sincronizada');
});

export default sequelize;
