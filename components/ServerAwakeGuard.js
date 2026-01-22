"use client";

import { useEffect, useState } from "react";

export default function ServerAwakeGuard({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [secondsPassed, setSecondsPassed] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        let timer;
        if (isLoading) {
            timer = setInterval(() => {
                setSecondsPassed((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isLoading]);

    useEffect(() => {
        const checkServer = async () => {
            try {
                setTimeout(async () => {
                    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/health`);
                    setIsLoading(false);
                }, 500);
            } catch (error) {
                console.error("Server check failed, retrying...", error);
                setError(error.message || "Failed to connect to server");
                setTimeout(checkServer, 2000);
            }
        };

        checkServer();
    }, []);

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
                <div className="flex flex-col items-center">
                    <div className="loading loading-dots loading-xl"></div>
                    <p className="mt-4 text-gray-500 font-medium">Waking up the Backend server...</p>
                    <p className="text-sm text-gray-400 mt-2">{secondsPassed}s</p>
                    {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
