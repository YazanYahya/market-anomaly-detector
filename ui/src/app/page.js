"use server";

import AnomalyDetection from '@/components/anomaly-detection'
import {fetchPredictionData} from "@/lib/predictionService";
import {determineInvestmentTip} from "@/lib/investmentService";

export default async function Home() {
    const {prediction, probability} = await fetchPredictionData();
    const isAnomaly = prediction === 1;
    const probabilityPercentage = (probability * 100).toFixed(2);
    const {investmentTip} = await determineInvestmentTip(isAnomaly, probabilityPercentage);
    const currentDate = new Date().toLocaleDateString('en-US',
        {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-900 text-white">
            <AnomalyDetection isAnomaly={isAnomaly}
                              probability={probabilityPercentage}
                              investmentTip={investmentTip}
                              currentDate={currentDate}/>
        </main>
    )
}