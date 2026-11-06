# Softoria Technologies — Corporate Website & Lead Portal (Local Development)

This is the official codebase for the **Softoria Technologies** corporate website and customer inquiry management system.

![Softoria Technologies](frontend/public/assets/logos/softoria-banner.jpg)

> **Brand Statement**: *Technology That Moves You Forward.*  
> **Brand Tagline**: *Build. Innovate. Grow.*

---

## 🏗️ Architecture Overview

The application is structured into two decoupled local development layers:

1. **Frontend (`frontend/`)**:
   - React 18 SPA built with Vite
   - Tailwind CSS design system with brand Black (`#0B0B0B`) and Gold (`#D4AF37`) palette
   - React Router v6 for client routing
   - Automatic 5-second enquiry popup with anti-spam honeypot & 7-day dismissal cooldown
   - Responsive corporate portfolio showcasing real case studies with interactive modals
   - Admin management dashboard for viewing, filtering, updating, and deleting customer enquiries

2. **Backend (`backend/`)**:
   - Node.js + Express.js REST API
   - MongoDB Atlas connection via Mongoose ODM
   - Defensive security: Helmet headers, CORS restrictions, rate limiting, and NoSQL sanitization
   - ReDoS-safe search and validated ObjectId operations
   - Cryptographic password hashing (`bcryptjs`) & stateless JWT authentication for administrators

---

## 💻 Local Development Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB Atlas**: An active cluster connection string

---

### 2. Backend Configuration & Startup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Ensure your local environment file `backend/.env` is configured (refer to `backend/.env.example`):
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://<db_username>:<db_password>@<cluster_host>/<database_name>?retryWrites=true&w=majority
   JWT_SECRET=<your_strong_random_jwt_secret>
   FRONTEND_URL=http://localhost:5173
   ADMIN_INITIAL_USERNAME=<your_admin_username>
   ADMIN_INITIAL_EMAIL=<your_admin_email>
   ADMIN_INITIAL_PASSWORD=<your_initial_admin_password>
   ```

4. Seed the initial admin account (run once against your database):
   ```bash
   node scripts/seedAdmin.js
   ```

5. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The backend will run on `http://localhost:5000` and automatically connect to MongoDB Atlas.*

---

### 3. Frontend Configuration & Startup

1. Open a second terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173`.*

---

## 🧪 Automated Testing Suite

To verify database persistence, rate limiting, anti-spam honeypots, JWT authentication, and admin endpoints against your connected MongoDB Atlas cluster:

```bash
cd backend
node scripts/testEndpoints.js
```

---

## 🔒 Accessing the Admin Management Portal

1. Open your browser to `http://localhost:5173`.
2. Access the login screen via either method:
   - **Footer Link**: Scroll to the bottom of any page and click `🔒 Admin Portal`.
   - **Keyboard Shortcut**: Press `Ctrl` + `Shift` + `A` (or `Cmd` + `Shift` + `A` on Mac).
   - **Direct URL**: Navigate to `http://localhost:5173/admin/login`.
3. Sign in using the credentials defined in your `backend/.env` file.

---

## 📁 Project Directory Map

```
website/
├── .gitignore               # Ignored local files (.env, node_modules, etc.)
├── README.md                # Local development instructions
├── backend/
│   ├── .env                 # Local secrets (NEVER committed)
│   ├── .env.example         # Template environment variables
│   ├── package.json         # Backend dependencies & scripts
│   ├── server.js            # Express server entry point
│   ├── config/              # Database connection & environment validation
│   ├── controllers/         # Enquiry & Auth request controllers
│   ├── middleware/          # JWT auth & rate limiting middleware
│   ├── models/              # Mongoose schemas (Enquiry, Admin)
│   ├── routes/              # Express API route declarations
│   └── scripts/             # Admin seeding & integration test runner
└── frontend/
    ├── .env.example         # Frontend environment template
    ├── package.json         # Frontend dependencies & scripts
    ├── vite.config.js       # Vite configuration with local API proxy
    ├── tailwind.config.js   # Softoria brand theme colors
    ├── index.html           # HTML5 document template
    ├── public/              # Brand logos, robots.txt, sitemap.xml
    └── src/
        ├── App.jsx          # Main client application & router
        ├── components/      # UI components (Navbar, Footer, Modals, Popup)
        ├── config/          # Company details & API endpoints
        ├── hooks/           # Popup frequency & custom React hooks
        ├── pages/           # Website pages & Admin portal views
        ├── sections/        # Homepage modular sections
        ├── services/        # Axios API client & data services
        └── utils/           # Client-side validation utilities
```
