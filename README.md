# 🎨 Modern E-Commerce Frontend

A **premium e-commerce frontend UI** built with **React.js and Tailwind CSS**, featuring **Glassmorphism, Neumorphism, and smooth micro-interactions**.

Designed for a modern shopping experience with animations similar to top brands like Apple, Nike, and Stripe.

---

## 🚀 Features

### 🎨 UI/UX Design

- ✨ Glassmorphism UI (blur + transparency)
- 🧊 Neumorphism cards (soft shadows)
- ⚡ Micro-interactions (hover, click effects)
- 🎬 Smooth animations using Framer Motion
- 🌙 Dark/Light mode support (optional)

---

### 🛍️ Pages Included

- 🏠 Home Page (Hero + Categories)
- 🧾 Product Listing Page
- 🔍 Search & Filter UI
- 🔐 Login Page
- 📝 Register Page
- 📊 Dashboard UI (preview)

---

### 🛒 Product Features

- Product grid layout (responsive)
- Category filtering (Men, Women, Boys, Girls)
- Price & rating filters
- Wishlist ❤️ UI
- Add to Cart animation

---

### 🔐 Authentication UI

- Login form with validation
- Register form with confirm password
- Show/Hide password toggle
- Error animations & input focus effects

---

## 🧱 Tech Stack

- React.js
- Tailwind CSS
- Framer Motion
- Axios (for API calls)

---

## 📁 Project Structure

```
client/
│
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   │
│   ├── hooks/            # Custom hooks
│   ├── services/         # API calls
│   ├── utils/            # Helpers
│   ├── App.js
│   └── main.jsx
│
└── package.json
```

---

## ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/ecommerce-frontend.git
cd ecommerce-frontend
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

## ▶️ Run the App

```bash
npm run dev
```

App will run at:

```
http://localhost:5173
```

---

## 🔗 API Integration

Update your API base URL inside:

```
src/services/api.js
```

Example:

```js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default API;
```

---

## 🎨 UI Highlights

- Glass cards with backdrop blur
- Neumorphic buttons and product cards
- Animated hover effects
- Smooth page transitions
- Gradient buttons & glowing inputs

---

## 📱 Responsiveness

- Mobile-first design
- Works on all screen sizes
- Adaptive layouts for tablet & desktop

---

## ⚡ Animations

- Page load fade-in
- Card hover lift + scale
- Button click ripple effect
- Add-to-cart animation
- Loading skeletons

---

## 🚀 Future Enhancements

- 🛒 Full cart functionality
- 💳 Checkout UI
- 🔔 Notifications UI
- ❤️ Persistent wishlist
- 🌐 Multi-language UI

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch
3. Commit changes
4. Push and create PR

---

## 🧾 License

MIT License

---

## 💡 Author

Developed by **Yasowant** 🚀

---

🔥 If you like this UI, give it a ⭐ on GitHub!
