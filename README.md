````markdown
# 🏠 CasaNest

**CasaNest** is a full-stack, scalable property listing platform built with **Node.js**, **Express**, and **MongoDB Atlas**. It features robust **user authentication**, **session management**, and dynamic server-side rendering with **EJS** templates for a seamless user experience.

---

## 📋 Table of Contents

- [🚀 Features](#-features)  
- [🛠 Tech Stack](#-tech-stack)  
- [🌐 Demo](#-demo)  
- [💻 Installation](#-installation)  
- [⚙️ Usage](#-usage)  
- [📂 Folder Structure](#-folder-structure)  
- [🔑 Environment Variables](#-environment-variables)  
- [☁️ Deployment](#-deployment)  
- [🤝 Contributing](#-contributing)  
- [📄 License](#-license)  
- [✉️ Contact](#-contact)  

---

## 🚀 Features

- 🔐 Secure **user authentication** using **Passport.js** (local strategy)  
- 🗃️ CRUD APIs for **listings** and **reviews** with **Mongoose** ODM  
- ☁️ Cloud-based **image uploads** and storage via **Cloudinary** with optimized delivery  
- 🗺️ Interactive, geolocated property maps using **Leaflet** and **OpenStreetMap**  
- 💾 Persistent **session management** with **express-session** and **connect-mongo** backed by MongoDB  
- ✨ Flash messaging for smooth UI feedback using **connect-flash**  
- 🖥️ Server-side rendered views powered by **EJS** and **ejs-mate** layout templates  
- 🔄 HTTP method override support for RESTful routes (PUT, DELETE)  

---

## 🛠 Tech Stack

| Layer               | Technology                     |
|---------------------|--------------------------------|
| Backend             | Node.js, Express.js            |
| Database            | MongoDB Atlas with Mongoose    |
| Authentication      | Passport.js (Local Strategy)   |
| File Storage        | Cloudinary                    |
| Maps Integration    | Leaflet.js + OpenStreetMap     |
| Session Storage     | express-session + connect-mongo|
| Templating Engine   | EJS + ejs-mate                 |
| Deployment Platform | Render                        |

---

## 🌐 Demo

Live demo: [https://casanest.onrender.com](https://casanest.onrender.com)  

---

## 💻 Installation

1. **Clone the repo:**
   ```bash
   git clone https://github.com/krishna-rastogi/CasaNest.git
   cd CasaNest
````

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file with:

   ```
   ATLASDB_URL=your_mongodb_atlas_connection_string
   SECRET=your_session_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_KEY=your_cloudinary_api_key
   CLOUDINARY_SECRET=your_cloudinary_api_secret
   NODE_ENV=development
   ```

4. **Start the server locally:**

   ```bash
   npm start
   ```

---

## ⚙️ Usage

* Register/login users with encrypted passwords via Passport.js
* Upload multiple property images with Cloudinary integration (auto-optimized)
* Manage property listings and reviews — create, update, delete
* View listings plotted on interactive maps with geolocation pins
* Receive flash notifications on form submissions and errors
* Seamless navigation using dynamic EJS views

---

## 📂 Folder Structure

```
CasaNest/
│
├── models/           # Mongoose schemas for User, Listing, Review
├── routes/           # Express route modules for modular API handling
├── public/           # Static assets (CSS, client-side JS, images)
├── views/            # EJS templates with layouts and partials
├── app.js            # Entry point & Express app configuration
├── package.json      # Dependencies & scripts
└── README.md         # Project documentation
```

---

## 🔑 Environment Variables

| Variable                | Description                               |
| ----------------------- | ----------------------------------------- |
| `ATLASDB_URL`           | MongoDB Atlas connection string           |
| `SECRET`                | Session secret for encryption             |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name                     |
| `CLOUDINARY_KEY`        | Cloudinary API key                        |
| `CLOUDINARY_SECRET`     | Cloudinary API secret                     |
| `NODE_ENV`              | Environment mode (development/production) |

---

## ☁️ Deployment

* Deployed on **Render** with automatic builds and environment variable configuration
* Whitelist Render IPs in MongoDB Atlas to avoid connection issues
* Use `npm start` as the start command in deployment settings

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -m "Add awesome feature"`)
4. Push the branch (`git push origin feature/awesome-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## ✉️ Contact

**Krishna Rastogi**
Email: [rastogikrishna0007@gmail.com](mailto:rastogikrishna0007@gmail.com)
GitHub: [krishna-rastogi](https://github.com/krishna-rastogi)

---

⭐️ Thanks for checking out CasaNest!
