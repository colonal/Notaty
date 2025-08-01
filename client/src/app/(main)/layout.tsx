import Header from "../../components/header";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="fixed inset-0 flex flex-col bg-[#1a1f2b]">
            <Header />
            <main className="flex-1 overflow-hidden">
                {children}
            </main>
        </div>
    );
} 