'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Progress} from '@/components/ui/progress';
import {AlertTriangle, Calendar, CheckCircle} from 'lucide-react';
import {motion} from 'framer-motion';

export default function AnomalyDetection({investmentTip, isAnomaly, probability, currentDate}) {
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
                            className={`text-8xl ${isAnomaly ? 'text-red-500' : 'text-green-500'}`}
                            initial={{scale: 0}}
                            animate={{scale: 1}}
                            transition={{type: 'spring', stiffness: 260, damping: 20}}
                        >
                            {isAnomaly ? <AlertTriangle/> : <CheckCircle/>}
                        </motion.div>
                        <motion.h2
                            className="text-3xl font-bold text-white"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.2}}
                        >
                            {isAnomaly ? 'Anomaly Detected' : 'Normal Market Conditions'}
                        </motion.h2>
                        <div className="w-full space-y-2">
                            <div className="flex justify-between text-sm text-gray-400">
                                <span>Anomaly Probability</span>
                                <span>{probability}%</span>
                            </div>
                            <motion.div
                                initial={{width: 0}}
                                animate={{width: '100%'}}
                                transition={{delay: 0.4, duration: 0.8}}
                            >
                                <Progress
                                    value={probability}
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
                            <p className="mt-4 text-justify">{investmentTip}</p>
                        </motion.div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}