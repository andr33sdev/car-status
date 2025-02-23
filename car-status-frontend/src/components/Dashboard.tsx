import Sidebar from "./Sidebar";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 p-6 bg-gray-100 overflow-auto">{children}</main>
        </div>
    );
};

export default Dashboard;
