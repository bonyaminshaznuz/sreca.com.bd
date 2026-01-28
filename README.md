# SRECA E-Commerce Platform

A full-stack e-commerce platform built with Django (backend) and React + Vite (frontend).
Live Link: https://sreca.com.bd/

## 🚀 Features

- User authentication and profile management
- Product catalog and shopping functionality
- Order management
- Responsive design with mobile navigation
- Theme support (dark/light mode)
- Mailjet integration for email services

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python** 3.8 or higher
- **Node.js** 16.x or higher
- **npm** or **yarn**
- **Git**

## 🛠️ Installation & Setup

### Backend Setup (Django)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - **Windows (PowerShell):**
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   - **Windows (CMD):**
     ```cmd
     venv\Scripts\activate.bat
     ```
   - **macOS/Linux:**
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Create a `.env` file in the `backend` directory (see `.env.example` for reference):
   ```env
   SECRET_KEY=your-secret-key-here
   DEBUG=True
   ALLOWED_HOSTS=localhost,127.0.0.1
   DATABASE_URL=sqlite:///db.sqlite3
   MAILJET_API_KEY=your-mailjet-api-key
   MAILJET_API_SECRET=your-mailjet-api-secret
   ```

6. Run migrations:
   ```bash
   python manage.py migrate
   ```

7. Create a superuser (optional):
   ```bash
   python manage.py createsuperuser
   ```

8. Run the development server:
   ```bash
   python manage.py runserver
   ```

   The backend will be available at `http://localhost:8000`

### Frontend Setup (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173` (or the port shown in terminal)

## 📁 Project Structure

```
sreca.com.bd/
├── backend/                 # Django backend
│   ├── account/            # User account app
│   ├── ecommerce/          # Main Django project
│   ├── media/              # User uploaded files
│   ├── manage.py           # Django management script
│   └── requirements.txt    # Python dependencies
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── api/           # API integration
│   │   ├── components/    # React components
│   │   ├── context/       # React context providers
│   │   ├── pages/         # Page components
│   │   └── images/        # Image assets
│   ├── public/            # Static public files
│   └── package.json       # Node.js dependencies
│
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## 🔧 Configuration

### Backend Configuration

- Update `backend/ecommerce/settings.py` with your production settings
- Set `DEBUG = False` in production
- Configure `ALLOWED_HOSTS` for your domain
- Set up proper database (PostgreSQL recommended for production)

### Frontend Configuration

- Update API endpoints in `frontend/src/api/axios.js`
- Configure environment variables in `.env` file

## 📝 Available Scripts

### Backend
- `python manage.py runserver` - Start development server
- `python manage.py migrate` - Apply database migrations
- `python manage.py makemigrations` - Create new migrations
- `python manage.py createsuperuser` - Create admin user

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚢 Deployment

### Backend Deployment

1. Set up a production database (PostgreSQL recommended)
2. Configure environment variables
3. Set `DEBUG = False`
4. Collect static files: `python manage.py collectstatic`
5. Use a production WSGI server (e.g., Gunicorn)

### Frontend Deployment

1. Build the project: `npm run build`
2. Deploy the `dist` folder to a static hosting service (Vercel, Netlify, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👥 Authors

- Kazi Bony Amin - Sreca E-commerce Authentication System

## 🙏 Acknowledgments

- Django team for the excellent framework
- React team for the amazing library
- Vite for the fast build tool
