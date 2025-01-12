'use client';

import {useEffect, useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Progress} from '@/components/ui/progress';
import {AlertTriangle, Calendar, CheckCircle, RefreshCcw} from 'lucide-react';
import {motion} from 'framer-motion';

export default function AnomalyDetection() {
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState('');
    const [tip, setTip] = useState('');

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/fetch-and-predict');
            const data = await response.json();
            const {prediction, probability} = data;
            const isAnomaly = prediction === 1;
            setResult({isAnomaly, probability: probability * 100});

            const dynamicTip = await fetchInvestmentTip(isAnomaly, probability * 100);
            setTip(dynamicTip);
        } catch (error) {
            console.error('Error fetching prediction data:', error);
            setTip('Error fetching data. Please try again later.');
        } finally {
            setIsLoading(false);
            updateCurrentDate();
        }
    };

    const fetchInvestmentTip = async (isAnomaly, probability) => {
        try {
            const response = await fetch('/api/investment-strategy', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({isAnomaly, probability}),
            });

            const data = await response.json();

            if (response.ok) {
                return data.tip;
            } else {
                console.error('Error fetching investment-strategy tip:', data.error);
                return 'Error fetching investment-strategy tip. Please try again later.';
            }
        } catch (error) {
            console.error('Error calling API:', error);
            return 'Error: Unable to fetch tip. Please try again later.';
        }
    };

    const updateCurrentDate = () => {
        const now = new Date();
        setCurrentDate(now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }));
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
                <div className="flex flex-col items-center space-y-4">
                    <RefreshCcw className="w-12 h-12 text-blue-500 animate-spin"/>
                    <p className="text-lg text-white">Loading, please wait...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            <Card className="w-full max-w-2xl bg-gray-800 border-gray-700 mx-auto mt-8">
                <CardHeader>
                    <CardTitle className="text-2xl text-white">Market Anomaly Status</CardTitle>
                    <CardDescription className="text-gray-400">Current day prediction result</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center space-y-6">
                        <motion.div
                            className="flex items-center space-x-2 text-gray-300"
                            initial={{opacity: 0, y: -20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.1}}
                        >
                            <Calendar className="w-5 h-5"/>
                            <span>{currentDate}</span>
                        </motion.div>
                        <motion.div
                            className={`text-8xl ${result?.isAnomaly ? 'text-red-500' : 'text-green-500'}`}
                            initial={{scale: 0}}
                            animate={{scale: 1}}
                            transition={{type: 'spring', stiffness: 260, damping: 20}}
                        >
                            {result?.isAnomaly ? <AlertTriangle/> : <CheckCircle/>}
                        </motion.div>
                        <motion.h2
                            className="text-3xl font-bold text-white"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.2}}
                        >
                            {result?.isAnomaly ? 'Anomaly Detected' : 'Normal Market Conditions'}
                        </motion.h2>
                        <div className="w-full space-y-2">
                            <div className="flex justify-between text-sm text-gray-400">
                                <span>Anomaly Probability</span>
                                <span>{result?.probability?.toFixed(2)}%</span>
                            </div>
                            <motion.div
                                initial={{width: 0}}
                                animate={{width: '100%'}}
                                transition={{delay: 0.4, duration: 0.8}}
                            >
                                <Progress
                                    value={result?.probability}
                                    className="w-full h-2"
                                />
                            </motion.div>
                        </div>
                        <motion.div
                            className="w-full text-center mt-4 text-gray-300 bg-gray-700 p-6 rounded-md text-lg font-semibold"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{delay: 0.5}}
                        >
                            <strong>Tip for Today:</strong>
                            <p className="mt-4">{tip}</p>
                        </motion.div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}