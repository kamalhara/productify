# Productify - Deployment Guide

## 🚀 Live URLs

### Production

- **Frontend**: https://productify-pied.vercel.app/
- **Backend API**: https://productify-11cv.onrender.com/
- **Database**: Neon PostgreSQL (Hosted)

---

## 📋 Architecture

```
┌─────────────────────┐
│  Frontend (Vercel)  │
│  Next.js 16 + React │
└──────────┬──────────┘
           │ HTTPS
           ▼
┌─────────────────────┐
│  Backend (Render)   │
│  Express 5 + Node   │
└──────────┬──────────┘
           │ Connection Pool
           ▼
┌─────────────────────┐
│  Database (Neon)    │
│  PostgreSQL + SSL   │
└─────────────────────┘
```

---

## 🔧 Deployment Checklist

### Frontend (Vercel)

✅ **Already Deployed** at https://productify-pied.vercel.app/

**Environment Variables Set:**

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZWxlZ2FudC1pYmV4LTQ3LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_gzJsEetrlcBYAnLz1WblovRCgDunMt1632YKiJZTVS
NEXT_PUBLIC_API_URL=https://productify-11cv.onrender.com
```

**To Update:**

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select the `productify` project
3. Settings → Environment Variables
4. Update any variable, then redeploy

---

### Backend (Render)

✅ **Already Deployed** at https://productify-11cv.onrender.com/

**Environment Variables Set:**

```
PORT=3001
DATABASE_URL=postgresql://neondb_owner:npg_ZcmpQ2dLCi3n@ep-plain-hill-a1tzpi1p-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
NODE_ENV=production
FRONTEND_URL=https://productify-pied.vercel.app
CLERK_SECRET_KEY=sk_test_gzJsEetrlcBYAnLz1WblovRCgDunMt1632YKiJZTVS
```

**To Update:**

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Select `productify-backend` service
3. Settings → Environment
4. Update variables, service auto-redeploys

**Database Migrations:**
Post-deploy hook runs `npm run db:push` automatically on each deployment.

---

## ✅ Testing Production

### API Health Check

```bash
curl https://productify-11cv.onrender.com/
```

Expected response:

```json
{
  "message": "Welcome to Productify API - powered by PostgreSQL, drizzle ORM, clerk Auth",
  "endPoint": {
    "user": "/api/user",
    "product": "/api/product",
    "comment": "/api/comment"
  }
}
```

### Frontend Test

1. Visit https://productify-pied.vercel.app/
2. Sign up with Clerk
3. Create a product
4. Verify data appears in your Neon database

---

## 🔐 Security

- **CORS**: Configured to allow `*.vercel.app` and localhost for development
- **HTTPS**: Enforced on both frontend and backend
- **API Keys**: Stored securely in environment variables (never in code)
- **Database**: SSL connection required, connection pooling via Neon

---

## 📊 Database

### Neon PostgreSQL

- **Host**: ep-plain-hill-a1tzpi1p-pooler.ap-southeast-1.aws.neon.tech
- **Database**: neondb
- **Connection**: Pooled via Neon's multi-tenant pooler

### Schema

Created automatically by Drizzle on first deploy via `npm run db:push`

Tables:

- `users` - User profiles
- `products` - Product listings
- `comments` - Product comments

---

## 🔄 CI/CD Pipeline

### Automatic Deployments

**Frontend (Vercel)**

- Trigger: Push to `main` branch
- Build: `npm run build`
- Deploy: Auto-deploy to production

**Backend (Render)**

- Trigger: Push to `main` branch
- Build: `npm install`
- Start: `npm start`
- Post-deploy: `cd backend && npm run db:push`

---

## 🐛 Troubleshooting

### Frontend not connecting to backend?

1. Check `NEXT_PUBLIC_API_URL` in Vercel env vars
2. Verify backend is running: `curl https://productify-11cv.onrender.com/`
3. Check browser console for CORS errors

### Backend database connection failing?

1. Verify `DATABASE_URL` in Render env vars
2. Check Neon dashboard for connection issues
3. Ensure IP is not blocked (Neon uses connection pooling)

### Clerk authentication not working?

1. Verify `CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` are set correctly
2. Add your Vercel domain to Clerk's allowed URLs
3. Check Clerk dashboard for webhook issues

---

## 📝 Local Development

### Backend

```bash
cd backend
npm install
# Create .env.local with DATABASE_URL and CLERK_SECRET_KEY
npm run dev
```

### Frontend

```bash
cd frontend
npm install
# Create .env.local with NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY, NEXT_PUBLIC_API_URL
npm run dev
```

---

## 🚀 Deployment Workflow

### First-time Deployment

1. Create GitHub repo and push code
2. Connect Render to GitHub
3. Deploy backend service
4. Create Neon database and copy `DATABASE_URL`
5. Set environment variables in Render
6. Verify backend is running
7. Connect Vercel to GitHub repo
8. Set environment variables in Vercel
9. Deploy frontend
10. Test end-to-end

### Subsequent Deployments

1. Make changes locally
2. Push to `main` branch
3. Both services auto-deploy
4. Database schema automatically migrates

---

## 📚 Tech Stack

| Component | Technology                           | Host   |
| --------- | ------------------------------------ | ------ |
| Frontend  | Next.js 16, React 19, Tailwind CSS 4 | Vercel |
| Backend   | Express 5, Node.js 18+               | Render |
| Database  | PostgreSQL 14+                       | Neon   |
| ORM       | Drizzle ORM                          | N/A    |
| Auth      | Clerk                                | SaaS   |

---

## 🎯 Next Steps

- [ ] Add custom domain to Vercel
- [ ] Configure Clerk production keys
- [ ] Set up monitoring alerts
- [ ] Enable analytics
- [ ] Configure backup strategy for database
- [ ] Set up logging/error tracking

---

## 📞 Support

For issues:

1. Check Vercel build logs
2. Check Render deployment logs
3. Check Neon connection status
4. Check Clerk webhooks

---

**Last Updated**: March 4, 2026  
**Status**: ✅ Production Ready
