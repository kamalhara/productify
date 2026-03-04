# Productify

A modern full-stack application for showcasing, discovering, and managing products. Share your products, get feedback from the community, and discover what others are building.

## 🚀 Features

- 🔐 **User Authentication** - Secure sign-up and sign-in with Clerk
- 📦 **Product Management** - Create, edit, and delete your products
- 💬 **Comments & Feedback** - Add comments to products for community feedback
- 👤 **User Profiles** - Manage your own products dashboard
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- ⚡ **Real-time Updates** - Instant feedback and notifications
- 🔍 **Product Discovery** - Browse and explore products from other users

## Tech Stack

### Frontend

- [Next.js 16](https://nextjs.org/) — React 19 framework
- [Tailwind CSS 4](https://tailwindcss.com/) — Utility-first CSS
- [Clerk](https://clerk.com/) — Authentication & user management
- [React Hot Toast](https://react-hot-toast.com/) — Toast notifications
- [Lucide React](https://lucide.dev/) — Icon library

### Backend

- [Express 5](https://expressjs.com/) — Node.js web framework
- [Drizzle ORM](https://orm.drizzle.team/) — SQL database ORM
- [PostgreSQL](https://www.postgresql.org/) — Relational database
- [Clerk Express](https://clerk.com/) — Authentication middleware

## 📋 Prerequisites

- **Node.js** >= 18
- **PostgreSQL** running locally or a hosted instance
- **Clerk** account for authentication keys ([sign up here](https://clerk.com))

## 🛠️ Installation & Setup

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file with your environment variables:

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/productify
   CLERK_SECRET_KEY=your_clerk_secret_key
   PORT=5000
   ```

4. Push the database schema:

   ```bash
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file with your environment variables:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`

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
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Users

- `GET /api/users/:id` - Get user profile
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Comments

- `GET /api/products/:id/comments` - Get product comments
- `POST /api/comments` - Add comment
- `DELETE /api/comments/:id` - Delete comment

## 🏗️ Building for Production

### Backend

```bash
cd backend
npm run build
npm start
```

### Frontend

```bash
cd frontend
npm run build
npm start
```

## 🐛 Troubleshooting

### CSS Import Error

If you encounter CSS import errors about `@import` rules not being at the top:

- Ensure all `@import` statements are at the very beginning of the CSS file
- No other CSS rules should precede `@import` statements

### Database Connection Issues

- Verify PostgreSQL is running
- Check `DATABASE_URL` format in `.env.local`
- Ensure the database exists with proper user permissions

### Authentication Issues

- Verify Clerk publishable and secret keys are correct
- Check that environment variables are properly set
- Ensure Clerk webhooks are configured in your dashboard

### Port Already in Use

If port 3000 or 5000 is already in use:

- Backend: Update `PORT` in `.env.local`
- Frontend: Use `next dev -p <PORT_NUMBER>`

## 📝 Development Workflow

1. Create a feature branch from `main`
2. Make your changes in either backend or frontend
3. Test locally before committing
4. Push your changes and create a pull request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 💬 Support

For issues, questions, or suggestions, please open an issue on the repository.

---

**Built with ❤️ using Next.js and Express**
