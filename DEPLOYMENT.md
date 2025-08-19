# 💕 Deployment Guide for Zoya's Birthday Website

## 🚀 Deploying to Netlify with Email Functionality

### Step 1: Set up Gmail App Password

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

### Step 2: Deploy to Netlify

1. **Push your code to GitHub**
2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Deploy settings:
     - Build command: `npm install`
     - Publish directory: `.`

### Step 3: Configure Environment Variables

In your Netlify dashboard, go to **Site settings → Environment variables** and add:

```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password
RECIPIENT_EMAIL=zoya-email@gmail.com
```

### Step 4: Test the Deployment

1. **Visit your Netlify URL**
2. **Complete the quiz** to reach the welcome page
3. **Click "Moods Now 💕"**
4. **Select a mood and send a message**
5. **Check your email** - you should receive a beautiful mood update email!

## 📧 Email Features

- **Beautiful HTML emails** with romantic styling
- **Real-time mood updates** from Zoya
- **Personalized messages** with timestamps
- **Responsive design** that works on all devices

## 🔧 Local Development

To test locally:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Create `.env` file**:
   ```
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-app-password
   RECIPIENT_EMAIL=zoya-email@gmail.com
   PORT=3000
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

4. **Visit**: `http://localhost:3000`

## 🎉 Features

✅ **Mood Selection**: 10 different moods with emojis  
✅ **Message Input**: Personal message from Zoya  
✅ **Email Notifications**: Beautiful HTML emails sent to you  
✅ **Romantic Advice**: Personalized advice based on mood  
✅ **Responsive Design**: Works on all devices  
✅ **Netlify Deployment**: Easy deployment with serverless functions  

## 💕 How It Works

1. **Zoya selects her mood** from 10 options
2. **She types a personal message** about how she's feeling
3. **The system sends a beautiful email** to your inbox
4. **You receive instant notifications** about her mood
5. **The system provides romantic advice** for each mood

## 🔒 Security

- **Environment variables** keep email credentials secure
- **CORS protection** prevents unauthorized access
- **Input validation** ensures data integrity
- **Error handling** provides graceful fallbacks

## 📱 Mobile Friendly

The mood tracker works perfectly on:
- 📱 Mobile phones
- 📱 Tablets  
- 💻 Desktop computers
- 🌐 All modern browsers

## 🎨 Customization

You can customize:
- **Email styling** in `netlify/functions/api.js`
- **Mood options** in `index.html`
- **Advice messages** in `script.js`
- **Website colors** in `styles.css`

## 💝 Perfect for Long Distance Relationships

This mood tracker is perfect for:
- **Long distance couples**
- **Busy schedules**
- **Romantic surprises**
- **Daily mood check-ins**
- **Special occasions**

---

**💕 Made with love for Zoya 💕**


