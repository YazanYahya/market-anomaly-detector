"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage() {
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
            <p className="text-gray-400 mb-6">We couldn’t process your request. Please try again later.</p>
            <Button onClick={handleReload} className="bg-blue-600 hover:bg-blue-700 px-4 py-2">Try Again</Button>
        </main>
    );
}