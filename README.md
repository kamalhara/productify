# Productify

A modern full-stack application for showcasing, discovering, and managing products. Share your products, get feedback from the community, and discover what others are building.

## 🌐 Live Demo

- **Frontend**: https://productify-pied.vercel.app/
- **Backend API**: https://productify-11cv.onrender.com/
- **Database**: Neon PostgreSQL (Hosted)

---

## 🚀 Features

- 🔐 **User Authentication** - Secure sign-up and sign-in with Clerk
- 📦 **Product Management** - Create, edit, and delete your products
- 💬 **Comments & Feedback** - Add comments to products for community feedback
- 👤 **User Profiles** - Manage your own products dashboard
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS 4
- ⚡ **Mobile Responsive** - Fully optimized for all device sizes
- 🔍 **Product Discovery** - Browse and explore products from other users
- 🚀 **Production Ready** - Deployed on Vercel & Render

---

## 🛠️ Tech Stack

### Frontend

- [Next.js 16](https://nextjs.org/) — React 19 framework with Turbopack
- [Tailwind CSS 4](https://tailwindcss.com/) — Utility-first CSS
- [Clerk](https://clerk.com/) — Authentication & user management
- [React Hot Toast](https://react-hot-toast.com/) — Toast notifications
- [Lucide React](https://lucide.dev/) — Icon library

### Backend

- [Express 5](https://expressjs.com/) — Node.js web framework
- [Drizzle ORM](https://orm.drizzle.team/) — SQL database ORM
- [PostgreSQL](https://www.postgresql.org/) — Relational database
- [Clerk Express](https://clerk.com/) — Authentication middleware
- [CORS](https://github.com/expressjs/cors) — Cross-Origin Resource Sharing

### Hosting & Infrastructure

- **Frontend**: [Vercel](https://vercel.com) — Global CDN & serverless functions
- **Backend**: [Render](https://render.com) — Cloud application hosting
- **Database**: [Neon](https://neon.tech) — Serverless PostgreSQL

---

## 📋 Prerequisites (Local Development)

- **Node.js** >= 18
- **PostgreSQL** running locally or a hosted instance
- **Clerk** account for authentication keys ([sign up here](https://clerk.com))
- **Git** for version control

---

## 🚀 Quick Start (Production)

Simply visit the live applications:

1. **Frontend**: https://productify-pied.vercel.app/
2. Sign up or sign in with Clerk
3. Create & share products
4. Leave feedback on other products

---

## 🛠️ Local Development Setup

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/kamalhara/productify.git
   cd productify/backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file:

   ```env
   PORT=3001
   DATABASE_URL=postgresql://user:password@localhost:5432/productify
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

4. Push the database schema:

   ```bash
   npm run db:push
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3000`

---

## 📂 Project Structure

```
productify/
├── backend/                           # Express.js API server
│   ├── src/
│   │   ├── index.js                  # Server entry point
│   │   ├── config/
│   │   │   └── env.js                # Environment configuration
│   │   ├── controllers/              # Route handlers
│   │   │   ├── userController.js
│   │   │   ├── productController.js
│   │   │   └── commentController.js
│   │   ├── db/
│   │   │   ├── index.js              # Database connection
│   │   │   ├── schema.js             # Database schema
│   │   │   ├── queries.js            # Database queries
│   │   │   └── seed.js               # Database seed data
│   │   └── routes/                   # API routes
│   │       ├── userRoutes.js
│   │       ├── productRoutes.js
│   │       └── commentRoutes.js
│   ├── drizzle.config.js             # Drizzle ORM configuration
│   └── package.json
│
├── frontend/                          # Next.js application
│   ├── app/
│   │   ├── globals.css               # Global styles
│   │   ├── layout.js                 # Root layout component
│   │   ├── page.js                   # Home page
│   │   ├── components/               # Reusable components
│   │   │   ├── Navbar.js
│   │   │   ├── ProductCard.js
│   │   │   ├── ProductForm.js
│   │   │   └── CommentSection.js
│   │   ├── create/                   # Create product page
│   │   ├── my-products/              # User's products dashboard
│   │   ├── product/                  # Product details
│   │   │   └── [id]/
│   │   │       ├── page.js
│   │   │       └── edit/             # Edit product page
│   │   ├── sign-in/                  # Authentication pages
│   │   ├── sign-up/
│   │   ├── lib/
│   │   │   └── api.js                # API utilities
│   │   └── public/                   # Static assets
│   ├── next.config.mjs
│   ├── postcss.config.mjs
│   └── package.json
│
├── README.md                          # This file
├── DEPLOYMENT.md                      # Detailed deployment guide
└── LICENSE
```

---

## 🔌 API Endpoints

### Users

- `POST /api/user/sync` - Sync user data (Clerk webhook)
- `GET /api/user/:id` - Get user profile
- `PUT /api/user/:id` - Update user

### Products

- `GET /api/product` - Get all products
- `GET /api/product/:id` - Get product details
- `GET /api/product/my` - Get current user's products
- `POST /api/product` - Create product
- `PUT /api/product/:id` - Update product
- `DELETE /api/product/:id` - Delete product

### Comments

- `POST /api/comment/:productId` - Add comment to product
- `DELETE /api/comment/:commentId` - Delete comment

---

## 🔄 Production Deployment

### Frontend (Vercel)

1. Fork the repository on GitHub
2. Go to [Vercel](https://vercel.com) and create a new project
3. Select your GitHub repository
4. Set the root directory to `frontend`
5. Add environment variables:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_API_URL` (your Render backend URL)
6. Deploy!

### Backend (Render)

1. Go to [Render](https://render.com) and create a new web service
2. Connect your GitHub repository
3. Set the root directory to `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables (see DEPLOYMENT.md)
7. Create a PostgreSQL database on Neon
8. Deploy!

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

---

## 📱 Responsive Design

The application is fully responsive and optimized for:

- 📱 Mobile (320px and up)
- 📱 Tablet (640px and up)
- 💻 Desktop (1024px and up)
- 🖥️ Large screens (1200px and up)

All components use Tailwind CSS responsive utilities with smooth transitions.

---

## 🔐 Security

- ✅ HTTPS/SSL encryption on all connections
- ✅ CORS configured for allowed origins
- ✅ Environment variables for sensitive data
- ✅ Clerk authentication for secure user management
- ✅ Database SSL connection with connection pooling
- ✅ No credentials in version control

---

## 🐛 Troubleshooting

### Frontend not connecting to backend?

1. Check `NEXT_PUBLIC_API_URL` is correctly set
2. Verify backend is running: `curl https://productify-11cv.onrender.com/`
3. Check browser console for CORS errors

### Database connection failing?

1. Verify `DATABASE_URL` is correct
2. Ensure local PostgreSQL is running (for local dev)
3. Check Neon dashboard for connection issues

### Build errors?

```bash
# Clear Next.js cache
rm -rf .next
npm run build

# Reinstall dependencies
rm -rf node_modules
npm install
```

---

## 📝 Development Workflow

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test locally
4. Commit: `git commit -m "Add feature"`
5. Push: `git push origin feature/your-feature`
6. Create a Pull Request

---

## 🎯 Future Enhancements

- [ ] User profiles with bio and portfolio links
- [ ] Product categories and filtering
- [ ] Search functionality
- [ ] Notifications system
- [ ] Product upvoting/rating
- [ ] Email notifications
- [ ] Dark mode
- [ ] Analytics dashboard
- [ ] Admin panel

---

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## 💬 Support

For issues, questions, or suggestions:

1. Check existing [GitHub Issues](https://github.com/kamalhara/productify/issues)
2. Create a new issue with detailed description
3. Include steps to reproduce bugs

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Express](https://expressjs.com/) - Web framework
- [Drizzle ORM](https://orm.drizzle.team/) - SQL ORM
- [Clerk](https://clerk.com/) - Authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vercel](https://vercel.com) - Frontend hosting
- [Render](https://render.com) - Backend hosting
- [Neon](https://neon.tech) - Database hosting

---

## 📊 Project Status

✅ **Production Ready** - v1.0.0

- Frontend deployed on Vercel
- Backend deployed on Render
- Database hosted on Neon
- All features functional
- Full mobile responsiveness

---

**Last Updated**: March 4, 2026  
**Current Version**: 1.0.0  
**Live Demo**: https://productify-pied.vercel.app/

---

**Built with ❤️ using Next.js and Express**
