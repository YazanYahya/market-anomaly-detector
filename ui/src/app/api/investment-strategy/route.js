import {NextResponse} from 'next/server';
import {getGroqResponse} from '@/utils/groqClient';

export async function POST(req) {
    try {
        const {isAnomaly, probability} = await req.json();

        if (typeof isAnomaly !== 'boolean' || typeof probability !== 'number') {
            return NextResponse.json(
                {error: 'Invalid request. `isAnomaly` must be a boolean and `probability` must be a number.'},
                {status: 400}
            );
        }

        // Construct the system prompt and user message
        const systemPrompt = "You are an investment-strategy advisor providing strategies based on market conditions.";
        const userMessage = `Today's market condition is ${
            isAnomaly ? 'an anomaly' : 'normal'
        } with a probability of ${probability.toFixed(2)}% being an anomaly. Suggest an appropriate investment strategy in 3 lines.`;

        const investmentTip = await getGroqResponse('llama-3.1-8b-instant', systemPrompt, userMessage);

        return NextResponse.json({tip: investmentTip}, {status: 200});
    } catch (error) {
        console.error('Error fetching investment-strategy tip from GroqClient:', error);
        return NextResponse.json(
            {error: 'Failed to fetch investment-strategy tip. Please try again later.'},
            {status: 500}
        );
    }
}