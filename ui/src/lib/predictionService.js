export async function fetchPredictionData() {
    try {
        const response = await fetch('http://localhost:8000/fetch-and-predict');
        if (!response.ok) {
            throw new Error(`Failed to fetch prediction data: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching prediction data:', error);
        throw new Error('Error while fetching prediction data.');
    }
}