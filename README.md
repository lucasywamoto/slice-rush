# 🍕 Fast Pizza Order App

A modern, fast, and responsive pizza ordering application built with React, TypeScript, and Redux Toolkit. Order your favorite pizzas with real-time tracking and seamless user experience.

## ✨ Features

- **Browse Menu**: View a complete menu of delicious pizzas with prices and descriptions
- **Shopping Cart**: Add, remove, and update pizza quantities in your cart
- **User Management**: Simple username-based session management
- **Order Creation**: Place orders with customer details and delivery information
- **Order Tracking**: Search and track your orders by order ID
- **Priority Orders**: Mark orders as priority for faster delivery
- **Geolocation**: Auto-fill address using device location
- **Responsive Design**: Beautiful UI that works on all devices
- **Real-time Updates**: Update order priority even after placement

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Code Quality**: ESLint, Prettier

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/lucasywamoto/fast-pizza-order-app.git
cd fast-pizza-order-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── features/           # Feature-based modules
│   ├── cart/          # Shopping cart functionality
│   ├── menu/          # Pizza menu display
│   ├── order/         # Order creation and tracking
│   └── user/          # User management
├── services/          # API services
│   ├── apiRestaurant.ts  # Restaurant API calls
│   └── apiGeocoding.ts   # Geolocation services
├── ui/                # Reusable UI components
├── utilities/         # Helper functions
├── store.ts           # Redux store configuration
├── routes.tsx         # Route definitions
└── App.tsx            # Main app component
```

## 🎯 Key Features Explained

### State Management
The app uses Redux Toolkit for efficient state management with three main slices:
- **User Slice**: Manages username and user session
- **Cart Slice**: Handles shopping cart operations
- **Order Management**: Tracks order status and details

### API Integration
- Connects to a pizza restaurant API for menu and order data
- Integrates with geocoding API for address lookup
- Proxy configuration in Vite for seamless API calls

### Routing
- Home page with user creation
- Menu browsing
- Cart management
- Order creation and confirmation
- Order tracking by ID

## 🎨 UI/UX Highlights

- Clean, modern design with gradient backgrounds
- Smooth animations and transitions
- Loading states and error handling
- Mobile-first responsive design
- Intuitive navigation and user flow

## 🔧 Configuration

The app uses several configuration files:
- `tailwind.config.js` - Tailwind CSS customization
- `postcss.config.js` - PostCSS plugins
- `prettier.config.js` - Code formatting rules
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite build configuration with API proxy

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Lucas Ywamoto**
- GitHub: [@lucasywamoto](https://github.com/lucasywamoto)

## 🙏 Acknowledgments

- Pizza API provided by Jonas Schmedtmann's React course
- Built as a learning project to demonstrate modern React patterns and best practices

---

**Enjoy ordering your pizza! 🍕**
