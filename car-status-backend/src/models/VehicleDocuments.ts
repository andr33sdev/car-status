import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';
import Vehicle from './Vehicle';

class VehicleDocument extends Model {
    public id!: number;
    public vehicle_id!: number;
    public fire_extinguisher_expiry!: Date;
    public vtv_expiry!: Date;
    public insurance_expiry!: Date;
    public license_plate_expiry!: Date;
}

VehicleDocument.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        vehicle_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: Vehicle, key: 'id' },
            onDelete: 'CASCADE'
        },
        fire_extinguisher_expiry: { type: DataTypes.DATE, allowNull: false },
        vtv_expiry: { type: DataTypes.DATE, allowNull: false },
        insurance_expiry: { type: DataTypes.DATE, allowNull: false },
        license_plate_expiry: { type: DataTypes.DATE, allowNull: false }
    },
    {
        sequelize,
        tableName: 'vehicle_documents',
        timestamps: false
    }
);

// Establece la relación con Vehicle
Vehicle.hasOne(VehicleDocument, { foreignKey: 'vehicle_id', as: 'documents' });
VehicleDocument.belongsTo(Vehicle, { foreignKey: 'vehicle_id', as: 'vehicle' });

export default VehicleDocument;
