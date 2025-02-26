import NavigationBar from "./NavigationBar";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col h-screen">
            <NavigationBar />
            <main className="flex-1 flex bg-anti-flash-white-500 overflow-x-hidden">{children}</main>
        </div>
    );
};

export default Dashboard;
