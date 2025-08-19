const nodemailer = require('nodemailer');

// Debug nodemailer
console.log('Nodemailer object:', typeof nodemailer);
console.log('Nodemailer methods:', Object.keys(nodemailer));
console.log('createTransporter available:', typeof nodemailer.createTransporter);

exports.handler = async (event, context) => {
    // Enable CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ 
                success: false, 
                error: 'Method not allowed' 
            })
        };
    }

    try {
        console.log('Function started');
        console.log('Event body:', event.body);
        
        const { mood, message } = JSON.parse(event.body);
        
        console.log('Parsed data:', { mood, message });
        
        if (!mood || !message) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ 
                    success: false, 
                    error: 'Mood and message are required' 
                })
            };
        }

        // Check environment variables
        console.log('Environment variables check:');
        console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Not set');
        console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not set');
        console.log('RECIPIENT_EMAIL:', process.env.RECIPIENT_EMAIL ? 'Set' : 'Not set');

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.RECIPIENT_EMAIL) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ 
                    success: false, 
                    error: 'Email configuration missing' 
                })
            };
        }

        // Email configuration
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECIPIENT_EMAIL,
            subject: `💕 Mood Update from Zoya: ${mood}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #FFB6C1, #FF69B4); border-radius: 15px;">
                    <h1 style="color: #FF1493; text-align: center; margin-bottom: 30px;">💕 Zoya's Mood Update 💕</h1>
                    
                    <div style="background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h2 style="color: #FF69B4; margin-bottom: 15px;">Current Mood: ${mood}</h2>
                        <p style="color: #333; line-height: 1.6; font-size: 16px;"><strong>Message:</strong> ${message}</p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <p style="color: #FF1493; font-size: 18px; font-weight: bold;">💕 I love you so much, my darling! 💕</p>
                        <p style="color: #FF69B4; font-size: 14px;">Sent with love from your birthday website</p>
                        <p style="color: #FF69B4; font-size: 12px; margin-top: 10px;">Sent on: ${new Date().toLocaleString()}</p>
                    </div>
                </div>
            `
        };

        console.log('Sending email...');
        
        // Send email
        await transporter.sendMail(mailOptions);
        
        console.log('Email sent successfully!');
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                success: true, 
                message: 'Mood message sent successfully! 💕' 
            })
        };
        
    } catch (error) {
        console.error('Error sending mood email:', error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                success: false, 
                error: 'Failed to send mood message',
                details: error.message
            })
        };
    }
};
