export function Header({
    sidebarOpen,
    setSidebarOpen,
    activeTab,
}: {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    activeTab: string;
}) {
    return (
        <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-6">
            <div className="flex items-center">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="mr-4 text-gray-500 hover:text-gray-700 lg:hidden"
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <h1 className="text-xl font-semibold text-gray-900">
                    {activeTab === "ai-chat" ? "AI Health Assistant" : "My Videos"}
                </h1>
            </div>
        </div>
    );
}