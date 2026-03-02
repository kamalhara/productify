# Productify

A full-stack productivity application built with **Next.js** and **Express**.

## Tech Stack

### Frontend

- [Next.js](https://nextjs.org/) — React framework
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [Clerk](https://clerk.com/) — Authentication

### Backend

- [Express](https://expressjs.com/) — Node.js web framework
- [Drizzle ORM](https://orm.drizzle.team/) — TypeScript ORM
- [PostgreSQL](https://www.postgresql.org/) — Relational database
- [Clerk](https://clerk.com/) — Authentication middleware

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **PostgreSQL** running locally or a hosted instance
- **Clerk** account for authentication keys

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/productify.git
   cd productify
   ```

2. **Set up the backend**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Fill in your environment variables in .env
   ```

3. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Fill in your environment variables in .env
   ```

### Running Locally

**Backend** (runs on port 3001):

```bash
cd backend
npm run dev
```

**Frontend** (runs on port 3000):

```bash
cd frontend
npm run dev
```

## Project Structure

```
productify/
├── backend/           # Express API server
│   ├── src/
│   │   └── index.js   # Entry point
│   └── package.json
├── frontend/          # Next.js application
│   ├── app/
│   ├── public/
│   └── package.json
└── README.md
```

## License

MIT
