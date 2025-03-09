import { createContext, useReducer, ReactNode } from "react";
import { Vehicle } from "../types";
import { VehicleDocuments } from "../pages/VehicleDetails";

// Definimos el type de nuestros estados
type VehiclesState = {
    vehicle: Vehicle,
    documents: VehicleDocuments
}

// Tipos de acciones posibles con su payload
type VehicleActions =
    | { type: 'CREATE_VEHICLE', payload: { vehicle: Vehicle } }
    | { type: 'CREATE_DOCUMENTS', payload: { documents: VehicleDocuments } }

// Estado inicial
const initialState: VehiclesState = {
    vehicle: {
        id: 0,
        brand: '',
        model: '',
        year: 0,
        license_plate: ''
    },
    documents: {
        fire_extinguisher_expiry: '',
        vtv_expiry: '',
        insurance_expiry: '',
        license_plate_expiry: ''
    }
}

// Reducer para manejar las acciones
const vehicleReducer = (state: VehiclesState, action: VehicleActions) => {
    switch (action.type) {
        case 'CREATE_VEHICLE':
            return {
                ...state,
                vehicle: action.payload.vehicle,
            }

        case 'CREATE_DOCUMENTS':
            return {
                ...state,
                documents: action.payload.documents,
            }

        default:
            return state
    }
}

// Crear el Contexto
export const VehicleContext = createContext<any>(null);

// Context Provider
export const VehicleProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(vehicleReducer, initialState);

    return (
        <VehicleContext.Provider value={{ state, dispatch }}>
            {children}
        </VehicleContext.Provider>
    );
};
