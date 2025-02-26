import { Link } from "react-router-dom";
import { Home, KeySquare, Car, Settings } from "lucide-react";

const NavigationBar = () => {
    return (
        <div className="w-screen h-18 bg-dark-blue-night text-white flex flex-row justify-between py-5 px-16 items-center">
            {/* Logo y navegación */}
            <div className="flex items-center space-x-18">
                <h1 className="text-xl font-bold">Car Status</h1>
                <nav className="flex flex-row space-x-4">
                    <Link to="/home" className="flex items-center gap-5 p-4 rounded-3xl hover:bg-white hover:text-dark-blue-night">
                        <Home size={20} /> Inicio
                    </Link>
                    <Link to="/create-vehicle" className="flex items-center gap-5 p-4 rounded-3xl hover:bg-white hover:text-dark-blue-night">
                        <Car size={20} /> Registrar Vehículo
                    </Link>
                    <Link to="/vehicles" className="flex items-center gap-5 p-4 rounded-3xl hover:bg-white hover:text-dark-blue-night">
                        <KeySquare size={20} /> Mis Vehículos
                    </Link>
                    <Link to="/settings" className="flex items-center gap-5 p-4 rounded-3xl hover:bg-white hover:text-dark-blue-night">
                        <Settings size={20} /> Configuración
                    </Link>
                </nav>
            </div>

            {/* Perfil */}
            <div className="flex flex-row space-x-10">
                <p>Profile</p>
                <p>User avatar</p>
            </div>
        </div>

    );
};

export default NavigationBar;
