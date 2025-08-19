exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        console.log('Test function started');
        console.log('Environment variables check:');
        console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Not set');
        console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not set');
        console.log('RECIPIENT_EMAIL:', process.env.RECIPIENT_EMAIL ? 'Set' : 'Not set');

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                message: 'Test function working!',
                env_vars: {
                    EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Not set',
                    EMAIL_PASS: process.env.EMAIL_PASS ? 'Set' : 'Not set',
                    RECIPIENT_EMAIL: process.env.RECIPIENT_EMAIL ? 'Set' : 'Not set'
                }
            })
        };
    } catch (error) {
        console.error('Test function error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                success: false,
                error: error.message
            })
        };
    }
};
