import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

class Vehicle extends Model {
    public id!: number;
    public user_id!: number;
    public brand!: string;
    public model!: string;
    public year!: number;
    public license_plate!: string;
}

Vehicle.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        brand: { type: DataTypes.STRING, allowNull: false },
        model: { type: DataTypes.STRING, allowNull: false },
        year: { type: DataTypes.INTEGER, allowNull: false },
        license_plate: { type: DataTypes.STRING, unique: true, allowNull: false }
    },
    {
        sequelize,
        tableName: 'vehicles',
        timestamps: false
    }
);

export default Vehicle;
