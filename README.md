# 🎫 Event Management Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green.svg)
![React](https://img.shields.io/badge/React-18.0+-blue.svg)
![Express](https://img.shields.io/badge/Express-4.0+-lightgrey.svg)

A modern full-stack event management platform built with React, Node.js, and MongoDB. Seamlessly create, manage, and book events with features like secure payments, real-time updates, and a responsive design.

<p align="center">
  <img src="https://ik.imagekit.io/r9naagwrj/Github/Screenshot%202025-03-21%20at%201.17.16%E2%80%AFPM.png" alt="Event Platform Screenshot" width="800">
</p>

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#%EF%B8%8F-api-documentation)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Contributors](#-contributors)
- [Contact](#-contact)
- [Roadmap](#-roadmap)
- [Acknowledgments](#-acknowledgments)

## ✨ Features

### 🎭 Event Management
- Create and manage events with rich details and media
- Set multiple ticket tiers and pricing
- Real-time availability updates
- Customizable event pages
- Event analytics and reporting
- Categories and tags for easy discoverability
- Featured and promoted events
- Bulk event creation and management for organizers

### 🎟️ Ticketing System
- Easy ticket booking flow
- QR code-based tickets
- Automatic email confirmations
- Booking history
- Refund processing
- Ticket transfer functionality
- Group bookings
- Waitlist for sold-out events
- Early-bird and promotional pricing

### 💳 Payment Integration
- Secure payment processing via Razorpay
- Multiple payment methods (cards, UPI, net banking)
- Automatic invoice generation
- International currency support
- Payment status tracking
- Refund management
- Discount codes and coupons
- Subscription-based payments for recurring events

### 👥 User Management
- Secure authentication via Supabase
- User roles (Admin, Organizer, Attendee)
- Profile management
- Booking history
- Wishlist functionality
- Social login options
- Email verification
- Two-factor authentication
- Password reset flow

### 📊 Analytics & Reporting
- Event performance metrics
- Attendance tracking
- Revenue analytics
- User acquisition insights
- Custom report generation
- Export data in multiple formats
- Real-time dashboard

### 🌐 Additional Features
- Responsive design for all devices
- Dark/Light mode
- Accessibility compliance
- SEO optimization
- Progressive Web App (PWA) support
- Offline functionality
- Multi-language support
- Location-based event recommendations

## 🚀 Technology Stack

### Frontend
- **React** (Vite build tool)
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for routing
- **React Query** for data fetching
- **Zustand** for state management
- **React Hook Form** for form handling
- **Zod** for form validation

### Backend
- **Node.js** runtime
- **Express** framework
- **MongoDB** database
- **Mongoose** ODM
- **JWT** for authentication
- **Joi** for validation
- **Winston** for logging
- **Jest** for testing

### Services
- 🔐 **Authentication**: Supabase
- 💰 **Payments**: Razorpay
- 🖼️ **Image Storage**: ImageKit
- 📧 **Email**: SendGrid
- 🔔 **Notifications**: Firebase Cloud Messaging
- 🗺️ **Maps**: Google Maps API
- 📊 **Analytics**: Google Analytics

## 🏗️ Architecture

The application follows a modern microservices architecture:

```
┌─────────────────┐     ┌────────────────┐     ┌─────────────────┐
│    Frontend     │────▶│  API Gateway   │────▶│  Auth Service   │
│    (React)      │     │   (Express)    │     │   (Supabase)    │
└─────────────────┘     └────────────────┘     └─────────────────┘
                              │                          
                              ▼                          
┌─────────────────┐     ┌────────────────┐     ┌─────────────────┐
│    Payment      │◀───▶│  Event Service │◀───▶│  Image Service  │
│    Service      │     │   (MongoDB)    │     │   (ImageKit)    │
└─────────────────┘     └────────────────┘     └─────────────────┘
```

## 📦 Installation

### Prerequisites
- Node.js >= 18.0.0
- MongoDB >= 4.4
- Supabase account
- Razorpay account
- ImageKit account
- Git

### Backend Setup
1. Clone the repository
```bash
git clone https://github.com/AAYUSH412/Event-Management-Platform-Eventpro-.git
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
# Server Configuration
PORT=8000
NODE_ENV=development
API_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173

# Database
MONGO_URI=your_mongodb_uri

# Authentication
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d

# Services
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

# Payment
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret

```

4. Start the server
```bash
# Development mode with hot reloading
npm run dev

# Production mode
npm run start
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
# API Configuration
VITE_API_URL=http://localhost:8000

# Authentication
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Payment
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id

4. Start the development server
```bash
npm run dev
```


## 🌟 Usage

### Creating an Account
1. Visit `http://localhost:5173` in your browser
2. Click "Sign Up" in the navigation bar
3. Fill in the required details and create your account
4. Verify your email address

### Creating an Event
1. Log in to your account
2. Go to Dashboard > Create Event
3. Fill in the event details including:
   - Title and description
   - Date and time
   - Location
   - Price and ticket types
   - Upload a cover image
   - Set category and tags
4. Preview and publish your event

### Booking Tickets
1. Browse events from the homepage or search for specific events
2. Select an event to view details
3. Click "Book Tickets" button
4. Select ticket type and quantity
5. Proceed to payment
6. Complete payment using Razorpay
7. Receive confirmation and e-tickets via email

### Managing Your Events
1. Go to Dashboard > My Events
2. View all your created events
3. Check event statistics and attendee lists
4. Make edits or cancel events if needed

## 🛠️ API Documentation

Our API follows RESTful principles and is documented using Swagger. Access the interactive documentation:

- Development: http://localhost:8000/api-docs
- Production: https://api.eventplatform.com/api-docs

### Key Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/events` | GET | Get all events |
| `/api/events/:id` | GET | Get an event by ID |
| `/api/events` | POST | Create a new event |
| `/api/events/:id` | PUT | Update an event |
| `/api/events/:id` | DELETE | Delete an event |
| `/api/tickets` | GET | Get all tickets |
| `/api/tickets/:id` | GET | Get a ticket by ID |
| `/api/tickets` | POST | Create a new ticket booking |
| `/api/payments/create` | POST | Create a payment order |
| `/api/payments/verify` | POST | Verify payment |

For detailed API documentation, sample requests and responses, refer to our [API Documentation](https://github.com/AAYUSH412/event-platform/wiki/API-Documentation).

## 🧪 Testing

### Running Backend Tests
```bash
cd backend
npm run test

# Run specific test suites
npm run test:unit
npm run test:integration

# Generate test coverage report
npm run test:coverage
```

### Running Frontend Tests
```bash
cd frontend
npm run test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

### End-to-End Testing
```bash
npm run test:e2e
```

## 🚢 Deployment

### Backend Deployment
The backend can be deployed to various platforms:

#### Vercel
```bash
cd backend
vercel
```

#### Heroku
```bash
cd backend
heroku create
git push heroku main
```

### Frontend Deployment
The frontend can be deployed to:

#### Vercel
```bash
cd frontend
vercel
```

#### Netlify
```bash
cd frontend
netlify deploy
```

## 🤝 Contributing

We welcome contributions from the community! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) file for details on:

- Code of conduct
- Branching strategy
- Pull request process
- Development workflow
- Coding standards

### Getting Started as a Contributor
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/aayushvaghela">
        <img src="https://github.com/aayushvaghela.png" width="100px;" alt="Aayush Vaghela"/>
        <br />
        <sub><b>Aayush Vaghela</b></sub>
      </a>
      <br />
      <sub>Project Lead</sub>
    </td>
    <!-- Add more contributors here -->
  </tr>
</table>

## 📧 Contact

Aayush Vaghela - [aayushvaghela12@gmail.com](mailto:aayushvaghela12@gmail.com)

Project Link: [https://github.com/AAYUSH412/event-platform](https://github.com/AAYUSH412/event-platform)

Join our community:
- [Discord](https://discord.gg/yourserverId)
- [Twitter](https://twitter.com/yourtwitterhandle)

## 🗺️ Roadmap

### Short-term Goals (Next 3 months)
- Mobile application development
- Advanced analytics dashboard
- Multi-language support
- Event series and recurring events

### Long-term Vision
- Marketplace for event services
- Integration with popular calendaring tools
- AI-powered event recommendations
- Augmented reality venue previews

Check our [project board](https://github.com/AAYUSH412/event-platform/projects) for detailed roadmap.

## 🙏 Acknowledgments

- [Supabase](https://supabase.io/) for authentication services
- [Razorpay](https://razorpay.com/) for payment processing
- [ImageKit](https://imagekit.io/) for image optimization
- [MongoDB](https://www.mongodb.com/) for database services
- [React](https://reactjs.org/) and [Node.js](https://nodejs.org/) communities
- All our contributors and supporters