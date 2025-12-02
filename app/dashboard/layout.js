import Header from "@/components/HeaderComp";

export default function DashboardLayout({ children }) {
    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
        </div>
    );
}
