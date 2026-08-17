# ⚡ EV Charging Station Booking System

A full-stack web application for finding electric vehicle (EV) charging stations and booking charging slots.

The application provides user registration and login, charging station search, station details, time-slot selection, booking management, and booking cancellation.

## 📌 Project Overview

The **EV Charging Station Booking System** helps EV users find available charging stations in different Indian cities and reserve a suitable charging time slot.

The project consists of:

* **React.js** frontend
* **Node.js + Express.js** backend
* REST API for stations, users, and bookings
* GitHub repository for source-code management

## ✨ Features

### 👤 User Authentication

* User registration
* Email and password login
* Phone number validation
* Password confirmation
* Logout functionality
* User information displayed after login

### 🔌 Charging Stations

The application includes **15 charging stations** across Indian cities, including:

* Bangalore
* Chennai
* Hyderabad
* Mangalore
* Mumbai
* Delhi
* Pune
* Kochi
* Mysore
* Coimbatore
* Ahmedabad
* Jaipur
* Kolkata
* Lucknow
* Bhubaneswar

Each station provides:

* Station name
* Location
* Charger type
* Available slots
* Availability status
* Rating
* Description
* Facilities
* Charging price
* Available time slots
* Station image

### 🔎 Station Search

Users can search for charging stations by entering a city or place name.

For example:

`Mangalore`

The application displays the charging stations available in that location.

### 📅 Charging Slot Booking

Users can:

1. Select a charging station.
2. Select a booking date.
3. Select an available time slot.
4. Enter vehicle details.
5. Confirm the booking.

Already-booked time slots are automatically shown as unavailable.

### ✅ Booking Confirmation

After a successful booking, the application displays a clear confirmation containing:

* Booking ID
* Charging station
* Booking date
* Time slot
* Vehicle number
* Customer name

### 📋 My Bookings

Users can view their existing bookings and:

* View booking details
* Refresh bookings
* Cancel a booking

When a booking is cancelled, the charging station's available slot count is restored.

## 🛠️ Technologies Used

### Frontend

* React.js
* JavaScript
* HTML
* CSS
* React Hooks (`useState`, `useEffect`)
* Fetch API

### Backend

* Node.js
* Express.js
* CORS
* REST API

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Google Chrome

## 📁 Project Structure

```text
EV-Charging-Station/
│
├── backend/
│   └── server.js
│
├── my-app/
│   ├── public/
│   │   ├── Bangalore.png
│   │   ├── Chennai.png
│   │   ├── Hyderbad.png
│   │   ├── Manalore.png
│   │   ├── Mysore.png
│   │   ├── pune.jpg
│   │   ├── Mumbai.png
│   │   ├── Delhi.png
│   │   ├── Kochi.png
│   │   ├── coimbate.png
│   │   ├── ahmedbad.png
│   │   ├── jaipur.png
│   │   ├── kolkata.png
│   │   ├── lucknow.png
│   │   └── other project images
│   │
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── other React files
│   │
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

## 🚀 Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/poojyashree2801-svg/EV-Charging-Station.git
```

Go to the project folder:

```bash
cd EV-Charging-Station
```

### 2. Start the Backend

Open a terminal and go to the backend folder:

```bash
cd backend
```

Install the required packages:

```bash
npm install
```

Start the backend server:

```bash
node server.js
```

The backend runs on:

```text
http://localhost:5000
```

You can check whether the backend is working by opening:

```text
http://localhost:5000/
```

Expected response:

```text
EV Charging Station Backend is running!
```

### 3. Start the Frontend

Open a **new terminal**.

Go to the React application:

```bash
cd my-app
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm start
```

The frontend will normally open at:

```text
http://localhost:3000
```

## 🔗 API Endpoints

The backend provides the following REST API endpoints.

### User Registration

```http
POST /api/register
```

Registers a new user.

### User Login

```http
POST /api/login
```

Authenticates an existing user.

### Get All Stations

```http
GET /api/stations
```

Returns all charging stations.

### Get One Station

```http
GET /api/stations/:id
```

Returns details of a particular charging station.

### Create Booking

```http
POST /api/bookings
```

Creates a new charging-slot booking.

### Get All Bookings

```http
GET /api/bookings
```

Returns the current bookings.

### Get One Booking

```http
GET /api/bookings/:id
```

Returns a particular booking.

### Update Booking

```http
PUT /api/bookings/:id
```

Updates an existing booking.

### Cancel Booking

```http
DELETE /api/bookings/:id
```

Cancels a booking and restores the station's available slot.

## 🧪 API Testing

The backend APIs can be tested using:

* Browser
* Postman
* Thunder Client
* VS Code REST clients

For example:

```http
GET http://localhost:5000/api/stations
```

This returns the list of charging stations in JSON format.

## 🔐 Booking Validation

The application validates:

* Required user information
* 10-digit contact number
* Password confirmation
* Required booking fields
* Charging station availability
* Duplicate time-slot bookings
* Booking date and time selection

A time slot cannot be booked again for the same station, date, and time.

## 💾 Data Storage

This project currently uses in-memory JavaScript arrays for demonstration:

* Users are stored in the `users` array.
* Charging stations are stored in the `stations` array.
* Bookings are stored in the `bookings` array.

Therefore, data will reset when the backend server is restarted.

A future version can use a database such as:

* MongoDB
* MySQL
* PostgreSQL

## 📸 Screenshots / Evidence

The project can be demonstrated using screenshots showing:

1. User login page
2. User registration page
3. Charging station list
4. City search results
5. Station details
6. Available time slots
7. Booking form
8. Booking confirmation
9. My Bookings section
10. API response from `/api/stations`

## 🎯 Implemented Solution

The implemented solution provides an integrated EV charging station booking platform.

The React frontend communicates with the Express.js backend using REST APIs. Users can register and log in, search for charging stations by location, view detailed station information, select available charging slots, and make reservations.

The backend manages users, charging stations, and bookings. It also prevents duplicate bookings for the same station, date, and time. When a booking is cancelled, the corresponding charging slot availability is restored.

## 🔮 Future Enhancements

Possible future improvements include:

* Database integration
* Online payment
* Google Maps integration
* GPS-based station search
* Real-time charger availability
* Email/SMS booking confirmation
* Admin dashboard
* User booking history stored permanently
* Password encryption
* JWT-based authentication

## 👩‍💻 Author

**Poojyashree**

### GitHub Repository

https://github.com/poojyashree2801-svg/EV-Charging-Station

## 📄 License

This project was developed for educational and academic purposes.
