import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_URL!,
    {
        dialect: 'postgres',
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch((error) => {
        console.error('No se pudo conectar a la base de datos:', error);
    });

export default sequelize;
