# Auramarket - E-Commerce Website

## Project Overview

Auramarket is a modern, user-friendly e-commerce website that enables customers to browse, search, and purchase products seamlessly online. The platform features dynamic product listings, secure payment integration, responsive design for all devices, and an intuitive user interface for smooth navigation. It also includes an admin dashboard for managing products, orders, and customer data efficiently.

## Project Links

### Repository Links
- **Frontend Repository**: [GitHub - Auramarket](https://github.com/Harsh-gupta-07/auramarket)
- **Backend Repository**: [GitHub - Auramarket-Server](https://github.com/Harsh-gupta-07/Auramarket-server)

### Live Deployment Links
- **Live Website**: [https://auramarket.vercel.app](https://auramarket.vercel.app/)

## Problem Statement

This project aims to create a reliable and scalable digital marketplace that enhances the shopping experience while simplifying business operations. The platform addresses the need for a comprehensive e-commerce solution with robust features for both customers and administrators.

## System Architecture

The proposed e-commerce system follows a **three-tier architecture** consisting of:

- **Frontend**: Next.js
- **Backend (API)**: Node.js with Express.js
- **Database**: MySQL with Prisma ORM

### Authentication
- **Method**: JWT (JSON Web Token)

### Hosting
- **Frontend**: Deployed on Vercel
- **Backend**: Hosted on Render
- **Database**: NeonDB

## Key Features

### Authentication & Authorization
- Secure user registration, login, and logout functionality using JWT-based authentication
- **User Roles**:
  - **Admin**: Can manage all products, view orders, and handle user accounts
  - **User**: Can browse products, manage cart, and place orders
- Protected routes and restricted access based on user roles

### CRUD Operations
Full CRUD (Create, Read, Update, Delete) functionalities for core entities:
- **Products**: Admins can add, edit, or remove products
- **Users**: Update user information, cart operations
- **Orders**: Users can create and view their orders; admins can update order status

### Frontend Routing (Next.js Folder Routing)
- **Home**: Display featured and categorized products
- **Login / Signup**: User authentication and registration
- **Dashboard**: Personalized area for users or admins to manage their activities
- **Product Details**: Detailed view of each product with "Add to Cart" and "Buy Now" options
- **Profile**: Manage user information and view order history
- **Cart & Checkout**: Manage selected products and complete purchases securely

### Product Search & Filtering
- Allows users to quickly find products using search keywords, category filters, and price range sliders for an optimized shopping experience

### Dynamic Product Loading
- Implements infinite scrolling or "load more" functionality to dynamically fetch and display products as the user scrolls, improving performance and user experience

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React.js, NextJS, TailwindCSS |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL |
| **Authentication** | JWT |
| **Hosting** | Vercel, Render |

## API Overview

| Endpoint | Method | Description | Access |
|----------|--------|-------------|---------|
| `/api/auth/signup` | POST | Register a new user | Public |
| `/api/auth/login` | POST | Authenticate user credentials and return a JWT | Public |
| `/api/auth/logout` | POST | Log out user and invalidate token | Authenticated |
| `/api/users/:id` | GET | Fetch user profile details | Authenticated |
| `/api/products` | GET | Retrieve all available products | Public |
| `/api/products/:id` | GET | Get details of a specific product | Public |
| `/api/products` | POST | Add a new product to the store | Admin only |
| `/api/products/:id` | PUT | Update product details | Admin only |
| `/api/products/:id` | DELETE | Delete a product from the database | Admin only |
| `/api/orders` | POST | Place a new order | Authenticated |
| `/api/orders/:id` | GET | View specific order details | Authenticated |
| `/api/orders` | GET | Get all active orders (admin dashboard) | Admin only |
