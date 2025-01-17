import {getGroqResponse} from "@/utils/groqClient";

export async function determineInvestmentTip(isAnomaly, probability) {
    try {
        const systemPrompt = "You are an investment-strategy advisor providing strategies based on market conditions.";
        const userMessage = `Today's market condition is ${
            isAnomaly ? 'an anomaly' : 'normal'
        } with a probability of ${probability}% being an anomaly. Suggest an appropriate investment strategy in 3 lines.`;

        const investmentTip = await getGroqResponse('llama-3.1-8b-instant', systemPrompt, userMessage);

        return {investmentTip}
    } catch (error) {
        console.error('Error fetching investment tip:', error);
        throw new Error('Error while fetching investment tip.');
    }
}