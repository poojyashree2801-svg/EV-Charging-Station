# EV Charging Station Booking System

## Project Overview

The EV Charging Station Booking System is a full-stack web application that allows users to view electric vehicle charging stations and book available charging slots.

The project demonstrates frontend development using React and backend development using Node.js and Express.js.

## Features

### Charging Stations

* View all charging stations
* View station location
* View charger type
* View available charging slots
* Display station availability status
* Prevent booking when a station is full

### Booking Management

* Create a charging slot booking
* View all bookings
* View individual booking details
* Update booking information
* Cancel bookings
* Automatically manage available charging slots
* Validate booking information
* Display success and error messages

## Technologies Used

### Frontend

* React.js
* HTML
* CSS
* JavaScript
* Fetch API
* Responsive design

### Backend

* Node.js
* Express.js
* CORS
* REST APIs
* JSON
* In-memory data storage

## Project Structure

```text
React JS/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── node_modules/
│
├── my-app/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── public/
│   └── package.json
│
└── README.md
```

## Backend API Endpoints

| Method | Endpoint            | Purpose                   |
| ------ | ------------------- | ------------------------- |
| GET    | `/`                 | Check backend status      |
| GET    | `/api/stations`     | Get all charging stations |
| GET    | `/api/stations/:id` | Get station by ID         |
| POST   | `/api/bookings`     | Create a booking          |
| GET    | `/api/bookings`     | Get all bookings          |
| GET    | `/api/bookings/:id` | Get booking by ID         |
| PUT    | `/api/bookings/:id` | Update a booking          |
| DELETE | `/api/bookings/:id` | Cancel a booking          |

## Example Booking Request

```json
{
  "userName": "Pooja",
  "contact": "9876543210",
  "stationId": 1,
  "date": "23-08-2026",
  "time": "10:00 AM",
  "vehicleNumber": "KA4456089"
}
```

## How to Run the Project

### Backend

Open a terminal and run:

```bash
cd backend
npm install
node server.js
```

The backend will run on:

```text
http://localhost:5000
```

### Frontend

Open another terminal and run:

```bash
cd my-app
npm install
npm start
```

The React application will run on:

```text
http://localhost:3000
```

## Validation and Error Handling

The application handles:

* Empty booking fields
* Invalid contact numbers
* Non-existent charging stations
* Fully occupied charging stations
* Non-existent bookings
* Invalid API requests

The backend uses appropriate HTTP status codes such as:

* `200 OK`
* `201 Created`
* `400 Bad Request`
* `404 Not Found`

## Data Storage

This project uses temporary in-memory JavaScript arrays for storing charging stations and bookings.

A database is not used because database integration is not mandatory for this assessment.

**Note:** Bookings are cleared when the backend server is restarted.

## Testing

The backend APIs were tested using Postman.

The frontend was tested using the React development server.

## Future Improvements

* Database integration
* User authentication
* Admin dashboard
* Booking history
* Payment integration
* Email/SMS notifications
* Real-time charging slot availability
* Station search and filtering

## Author

**Poojyashree**


