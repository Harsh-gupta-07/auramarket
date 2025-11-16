Auramarket – E-Commerce Website

🚀 Live Deployment
	•	Frontend (Vercel): https://auramarket.vercel.app/

Backend Repo : https://github.com/Harsh-gupta-07/Auramarket-server

⸻

📌 Project Overview

Auramarket is a modern and responsive e-commerce platform designed to deliver a seamless shopping experience. It enables users to browse, search, and purchase products online with secure authentication and an intuitive interface. Admins can efficiently manage products, orders, and users through a dedicated dashboard.

⸻

🧩 Problem Statement

This project aims to build a scalable and user-friendly e-commerce system that:
	•	Displays dynamic product listings
	•	Provides secure authentication & authorization
	•	Offers a smooth checkout process
	•	Includes admin capabilities for managing the marketplace
	•	Ensures performance and usability across all devices

⸻

🏛️ System Architecture

Auramarket follows a three-tier architecture:

1. Frontend
	•	Technology: Next.js, React.js, TailwindCSS
	•	Features: UI, routing, product pages, user dashboard
	•	Hosting: Vercel

2. Backend (API)
	•	Technology: Node.js, Express.js
	•	Features: REST APIs, authentication, business logic
	•	Hosting: Render

3. Database
	•	Technology: MySQL with Prisma ORM
	•	Hosting: NeonDB

Authentication
	•	Method: JWT-based secure authentication
	•	Supports both Admin and User roles

⸻

✨ Key Features

🔐 Authentication & Authorization
	•	Secure signup, login, logout
	•	JWT-based route protection
	•	Role-based access control:
	•	Admin: manage products, view orders, manage users
	•	User: manage profile, use cart, place orders

🛒 CRUD Operations
	•	Products: Add, update, delete (Admin), view (all)
	•	Users: Manage profile, update info
	•	Orders: Create/view orders (User), update status (Admin)

🌐 Frontend Routing (Next.js)
	•	Home Page – Featured & categorized products
	•	Login/Signup – User authentication
	•	Dashboard – User/Admin specific actions
	•	Product Details – With cart & buy options
	•	Profile – Personal info & order history
	•	Cart & Checkout – Secure checkout flow

🔍 Search & Filtering
	•	Category filtering
	•	Price range filter
	•	Search by product name/keywords

♾️ Dynamic Product Loading
	•	Infinite scrolling / Load more
	•	Optimized performance through API-based pagination

☁️ Hosting Overview
	•	Frontend: Vercel
	•	Backend: Render
	•	Database: NeonDB

⸻

🛠️ Tech Stack

Layer	Technologies
Frontend	React.js, Next.js, TailwindCSS
Backend	Node.js, Express.js
Database	MySQL, Prisma ORM
Authentication	JWT
Hosting	Vercel, Render


⸻

📡 API Endpoints Overview

Authentication

Endpoint	Method	Description	Access
/api/auth/signup	POST	Register new user	Public
/api/auth/login	POST	User login, returns JWT	Public
/api/auth/logout	POST	Logout user	Authenticated

Users

Endpoint	Method	Description	Access
/api/users/:id	GET	Get user profile	Authenticated

Products

Endpoint	Method	Description	Access
/api/products	GET	Get all products	Public
/api/products/:id	GET	Get product details	Public
/api/products	POST	Add new product	Admin only
/api/products/:id	PUT	Update product	Admin only
/api/products/:id	DELETE	Delete product	Admin only

Orders

Endpoint	Method	Description	Access
/api/orders	POST	Create order	Authenticated
/api/orders/:id	GET	View order details	Authenticated
/api/orders	GET	View all orders	Admin only
