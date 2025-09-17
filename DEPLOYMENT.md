# 🚀 Deployment Guide - Ayurvedic Herb Traceability System

## 🔗 Quick Live Link (Temporary - LocalTunnel)

Your application should now be accessible at:
**https://ayurvedic-herbs.loca.lt**

> Note: You may need to enter a password displayed in the terminal when accessing the link.

## 📱 Share Your Local Server (Immediate Solutions)

### Option 1: LocalTunnel (Currently Active)
```bash
# Install globally
npm install -g localtunnel

# Start tunnel
lt --port 3000 --subdomain ayurvedic-herbs

# Your app will be available at: https://ayurvedic-herbs.loca.lt
```

### Option 2: Ngrok (More Reliable)
1. Download ngrok from https://ngrok.com/download
2. Sign up for free account at https://ngrok.com
3. Run:
```bash
ngrok authtoken YOUR_AUTH_TOKEN
ngrok http 3000
```

## 🌐 Free Cloud Hosting Options

### 1. Deploy to Render (Recommended - Free)

1. **Prepare your code:**
```bash
git init
git add .
git commit -m "Initial commit"
```

2. **Push to GitHub:**
- Create a new repository on GitHub
- Push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/ayurvedic-traceability.git
git push -u origin main
```

3. **Deploy on Render:**
- Go to https://render.com
- Sign up/Login with GitHub
- Click "New +" → "Web Service"
- Connect your GitHub repository
- Configure:
  - Name: `ayurvedic-traceability`
  - Environment: `Node`
  - Build Command: `npm install`
  - Start Command: `npm start`
- Click "Create Web Service"

**Live URL:** `https://ayurvedic-traceability.onrender.com`

### 2. Deploy to Railway (Simple & Fast)

1. **Install Railway CLI:**
```bash
npm install -g @railway/cli
```

2. **Login and Deploy:**
```bash
railway login
railway init
railway up
```

3. **Generate domain:**
```bash
railway domain
```

**Live URL:** Will be provided by Railway

### 3. Deploy to Vercel (For Static + API)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Create vercel.json:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

3. **Deploy:**
```bash
vercel
```

**Live URL:** `https://ayurvedic-traceability.vercel.app`

### 4. Deploy to Heroku (Requires Credit Card)

1. **Install Heroku CLI**
2. **Create Procfile:**
```
web: node server.js
```

3. **Deploy:**
```bash
heroku create ayurvedic-traceability
git push heroku main
```

### 5. Deploy to Glitch (Instant, No Setup)

1. Go to https://glitch.com
2. Click "New Project" → "Import from GitHub"
3. Paste your GitHub URL
4. Your app will be live instantly!

**Live URL:** `https://ayurvedic-traceability.glitch.me`

## 🔧 Environment Variables for Production

Create a `.env` file:
```env
NODE_ENV=production
PORT=3000
DATABASE_URL=your_database_url
```

## 📊 Database Considerations

For production, consider using:
- **PostgreSQL** (Render, Railway provide free tier)
- **MongoDB Atlas** (Free 512MB cluster)
- **Supabase** (Free PostgreSQL)

## 🔒 Production Checklist

- [ ] Enable HTTPS (automatic on most platforms)
- [ ] Set secure headers
- [ ] Use environment variables for secrets
- [ ] Enable CORS properly
- [ ] Set up monitoring (e.g., UptimeRobot)
- [ ] Configure custom domain (optional)
- [ ] Set up SSL certificate
- [ ] Enable rate limiting
- [ ] Add error logging (e.g., Sentry)

## 🆓 Best Free Options Comparison

| Platform | Pros | Cons | Best For |
|----------|------|------|----------|
| **Render** | Easy setup, Auto-deploy from GitHub | Cold starts on free tier | Production apps |
| **Railway** | Fast deployment, Good developer experience | Limited free hours | Quick demos |
| **Vercel** | Fast, Great for Next.js | Better for frontend | JAMstack apps |
| **Glitch** | Instant setup, In-browser editor | Sleeps after 5 min | Prototypes |
| **Replit** | In-browser IDE, Collaborative | Performance limitations | Learning/Teaching |

## 📱 Mobile App Deployment

To make a mobile app:
1. Use the responsive web version
2. Create a PWA (Progressive Web App)
3. Use Capacitor or Cordova to wrap as native app

## 🚀 Quick Start Commands

```bash
# Local development
npm start

# Create tunnel for sharing
lt --port 3000

# Deploy to Render (after GitHub push)
# Automatic via Render dashboard

# Deploy to Railway
railway up

# Deploy to Vercel
vercel --prod
```

## 📞 Support & Issues

- Check server logs: `npm start`
- Database issues: Ensure `database` folder has write permissions
- Port conflicts: Change PORT in `.env` or use different port
- CORS issues: Check `cors` configuration in `server.js`

## 🎉 Your Live Links

After deployment, your app will be available at:

1. **Temporary (LocalTunnel):** https://ayurvedic-herbs.loca.lt
2. **Render:** https://[your-app-name].onrender.com
3. **Railway:** https://[your-app-name].up.railway.app
4. **Vercel:** https://[your-app-name].vercel.app
5. **Glitch:** https://[your-app-name].glitch.me

---

**Note:** For production use, consider upgrading to paid tiers for better performance, custom domains, and no sleep/cold starts.