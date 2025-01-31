# 🎫 Event Management Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green.svg)

A modern full-stack event management platform built with React, Node.js, and MongoDB. Seamlessly create, manage, and book events with features like secure payments, real-time updates, and a responsive design.


## ✨ Features

### 🎭 Event Management
- Create and manage events with rich details and media
- Set multiple ticket tiers and pricing
- Real-time availability updates
- Customizable event pages
- Event analytics and reporting

### 🎟️ Ticketing System
- Easy ticket booking flow
- QR code-based tickets
- Automatic email confirmations
- Booking history
- Refund processing

### 💳 Payment Integration
- Secure payment processing via Razorpay
- Multiple payment methods
- Automatic invoice generation
- International currency support

### 👥 User Management
- Secure authentication via Supabase
- User roles (Admin, Organizer, Attendee)
- Profile management
- Booking history
- Wishlist functionality

## 🚀 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Framer Motion
- TypeScript

### Backend
- Node.js
- Express
- MongoDB
- Mongoose

### Services
- 🔐 Authentication: Supabase
- 💰 Payments: Razorpay
- 🖼️ Image Storage: ImageKit

## 📦 Installation

### Prerequisites
- Node.js >= 18.0.0
- MongoDB
- Supabase account
- Razorpay account
- ImageKit account

### Backend Setup
1. Clone the repository
```bash
git clone https://github.com/yourusername/event-platform.git
cd event-platform/backend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Configure the following in `.env`:
```env
PORT=8000
MONGO_URI=your_mongodb_uri
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

4. Start the server
```bash
npm run dev
```

### Frontend Setup
1. Navigate to frontend directory
```bash
cd ../frontend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Configure the following in `.env`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:8000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

4. Start the development server
```bash
npm run dev
```

## 🌟 Usage

1. Visit `http://localhost:5173` in your browser
2. Create an account or log in
3. Start creating events or browsing available events
4. Test the payment flow using Razorpay test credentials

## 🛠️ API Documentation

API documentation is available at `/api/docs` when running the backend server. It includes detailed information about all available endpoints, request/response formats, and authentication requirements.

## 🧪 Running Tests

```bash
# Run backend tests
cd backend
npm run test

# Run frontend tests
cd frontend
npm run test
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your PR follows our contribution guidelines.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributors

- [Aayush Vaghela](https://github.com/yourusername) - Project Lead

## 📧 Contact

Aayush Vaghela - [aayushvaghela12@gmail.com](mailto:aayushvaghela12@gmail.com)

Project Link: [https://github.com/yourusername/event-platform](https://github.com/yourusername/event-platform)

## 🙏 Acknowledgments

- [Supabase](https://supabase.io/) for authentication
- [Razorpay](https://razorpay.com/) for payment processing
- [ImageKit](https://imagekit.io/) for image optimization
- All our contributors and supporters