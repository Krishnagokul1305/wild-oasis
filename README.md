# Cabin Booking Admin Dashboard

A responsive and modern admin panel for managing cabin bookings, built using the MERN stack. This dashboard allows administrators to manage cabin availability, handle reservations, and control user access securely and efficiently.

## ✨ Features
- **Cabin Management**: Create, update, and delete cabin listings.
- **Booking Overview**: Monitor and manage all cabin bookings.
- **User Authentication**: Secure login and access control.
- **Responsive UI**: Optimized for all screen sizes using Tailwind CSS.

## 🛠️ Tech Stack
- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: NextAuth.js

## 📁 Folder Structure

### Backend
```
Backend/
├── config/
│   └── dbConnect.js
├── controllers/
├── middlewares/
├── models/
├── public/img/
├── routes/
├── services/
├── utils/
├── app.js
├── server.js
├── package.json
```

### Frontend
```
Frontend/
├── config/
├── src/
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── package.json
```

## ⚡ Installation

1. **Clone the Repository**
```bash
git clone https://github.com/Krishnagokul1305/wild-oasis.git
cd wild-oasis
```

2. **Backend Setup**
```bash
cd Backend
npm install
npm run dev
```

3. **Frontend Setup**
```bash
cd ../Frontend
npm install
npm run dev
```

> Ensure MongoDB is running locally or provide a remote URI in `Backend/config/dbConnect.js`.
