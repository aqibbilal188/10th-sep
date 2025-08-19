const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Mood message endpoint
app.post('/api/send-mood-email', async (req, res) => {
    try {
        const { mood, message } = req.body;
        
        if (!mood || !message) {
            return res.status(400).json({ 
                success: false, 
                error: 'Mood and message are required' 
            });
        }

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECIPIENT_EMAIL, // Zoya's email
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
                    </div>
                </div>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);
        
        res.json({ 
            success: true, 
            message: 'Mood message sent successfully! 💕' 
        });
        
    } catch (error) {
        console.error('Error sending mood email:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to send mood message' 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        message: 'Mood tracker server is running! 💕' 
    });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
    console.log(`💕 Mood tracker server running on port ${PORT}`);
    console.log(`🌐 Server URL: http://localhost:${PORT}`);
});
