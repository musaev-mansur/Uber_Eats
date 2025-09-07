# 🍔 Uber Eats Clone - Food Delivery Web Application

A full-featured food delivery web application built with modern technologies.

> **⚠️ Project Status: Under Development**  
> This project is currently in active development. Some features may be incomplete or subject to change.  
> We are continuously working on improving functionality, fixing bugs, and adding new features.

## 🚀 Technologies

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Typed JavaScript
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **Shadcn/ui** - UI components
- **Axios** - HTTP client

### Backend
- **Django 4.2** - Python web framework
- **Django REST Framework** - API
- **PostgreSQL** - Database
- **Django CORS Headers** - CORS support

## 📁 Project Structure

```
Uber_Eats/
├── frontend/                 # Next.js application
│   ├── app/                 # App Router pages
│   ├── components/          # React components
│   ├── store/              # Redux store
│   ├── types/              # TypeScript types
│   └── lib/                # Utilities
├── backend/                 # Django application
│   ├── uber/               # Main application
│   ├── uber_backend/       # Project settings
│   └── requirements.txt    # Python dependencies
└── README.md
```

## 🛠️ Installation and Setup

### Prerequisites
- Node.js 18+
- Python 3.9+
- PostgreSQL

### Backend (Django)

1. Navigate to the backend folder:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate     # Windows
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure the database in `uber_backend/settings.py`

5. Run migrations:
```bash
python manage.py migrate
```

6. Create a superuser:
```bash
python manage.py createsuperuser
```

7. Start the server:
```bash
python manage.py runserver
```

### Frontend (Next.js)

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the application:
```bash
npm run dev
```

The application will be available at: http://localhost:3000

## 🎯 Key Features

### For Customers:
- ✅ User registration and authentication
- ✅ Browse restaurants and menus
- ✅ Add items to cart
- ✅ Place orders
- ✅ View order history
- ✅ Profile management

### For Restaurants:
- ✅ Restaurant registration
- ✅ Menu management (add/edit dishes)
- ✅ View orders
- ✅ Manage order statuses

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout

### Users
- `GET /api/users/me/` - Current user profile
- `PUT /api/users/me/` - Update user profile

### Restaurants
- `GET /api/cafes/` - List restaurants
- `GET /api/cafes/{id}/` - Restaurant details

### Menu
- `GET /api/foods/` - List dishes
- `POST /api/foods/` - Add dish (restaurants only)
- `PUT /api/foods/{id}/` - Update dish
- `DELETE /api/foods/{id}/` - Delete dish

### Orders
- `GET /api/orders/` - List orders
- `POST /api/orders/` - Create order
- `PUT /api/orders/{id}/` - Update order

## 🎨 UI/UX Features

- **Responsive Design** - works on all devices
- **Dark/Light Theme** - theme switching
- **Modern Interface** - uses Shadcn/ui components
- **Intuitive Navigation** - simple and clear menu
- **Fast Loading** - optimized images and code

## 🔐 Security

- JWT tokens for authentication
- CORS configuration
- Data validation on frontend and backend
- Protected routes

## 📱 Mobile Version

The application is fully responsive and works great on mobile devices.

## 🚧 Development Roadmap

### Current Status
- ✅ Basic authentication system
- ✅ Restaurant and menu management
- ✅ Order placement and tracking
- ✅ Responsive UI design
- 🔄 Order status management (in progress)
- 🔄 Payment integration (planned)
- 🔄 Real-time notifications (planned)
- 🔄 Advanced search and filters (planned)
- 🔄 Delivery tracking (planned)
- 🔄 Admin dashboard (planned)

### Upcoming Features
- Payment gateway integration
- Real-time order updates
- Advanced analytics for restaurants
- Customer reviews and ratings
- Delivery driver management
- Push notifications
- Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Create a Pull Request

## 📄 License

This project is created for educational purposes.

## 👥 Authors

- **Mansur Musaev** - [GitHub](https://github.com/Mansur-09595)
- **Khabib Maruev** - [GitHub](https://github.com/Maruev-H)

## 🚀 Demo

To demonstrate the functionality:
1. Start backend and frontend
2. Register as a customer
3. Create a test restaurant
4. Add dishes to the menu
5. Place an order

---

**Note**: This is an educational project created for learning modern web technologies.
