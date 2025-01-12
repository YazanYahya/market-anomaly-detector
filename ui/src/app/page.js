import AnomalyDetection from '@/components/anomaly-detection'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-900 text-white">
            <AnomalyDetection/>
        </main>
    )
}