import { Link } from "react-router-dom";
import { Home, Car, Settings } from "lucide-react";

const Sidebar = () => {
    return (
        <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col p-5">
            <h1 className="text-xl font-bold mb-6">Car Status</h1>
            <nav className="flex flex-col space-y-4">
                <Link to="/home" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800">
                    <Home size={20} /> Inicio
                </Link>
                <Link to="/vehicles" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800">
                    <Car size={20} /> Mis Vehículos
                </Link>
                <Link to="/settings" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800">
                    <Settings size={20} /> Configuración
                </Link>
            </nav>
        </aside>
    );
};

export default Sidebar;
