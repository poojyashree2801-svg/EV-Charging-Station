


const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ===============================
// USERS
// ===============================

let users = [];

// Register
app.post("/api/register", (req, res) => {
  const {
    fullName,
    email,
    phone,
    password,
    confirmPassword
  } = req.body;

  // Check all fields
  if (
    !fullName ||
    !email ||
    !phone ||
    !password ||
    !confirmPassword
  ) {
    return res.status(400).json({
      message: "All registration fields are required."
    });
  }

  // Check password match
  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "Passwords do not match."
    });
  }

  // Check phone
  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).json({
      message: "Please enter a valid 10-digit phone number."
    });
  }

  // Check email
  const emailExists = users.some(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase()
  );

  if (emailExists) {
    return res.status(400).json({
      message: "An account with this email already exists."
    });
  }

  // Create user
  const newUser = {
    id: users.length + 1,
    fullName,
    email,
    phone,
    password
  };

  users.push(newUser);

  res.status(201).json({
    message: "Registration successful!",
    user: {
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      phone: newUser.phone
    }
  });
});

// Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required."
    });
  }

  const user = users.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password."
    });
  }

  res.json({
    message: "Login successful!",
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone
    }
  });
});

// ===============================
// CHARGING STATIONS
// ===============================

const stations = [
  {
    id: 1,
    name: "Green Charge Hub",
    location: "Bangalore",
    chargerType: "DC Fast Charger",
    availableSlots: 4,
    status: "Available"
  },
  {
    id: 2,
    name: "EcoCharge Station",
    location: "Chennai",
    chargerType: "AC Charger",
    availableSlots: 2,
    status: "Available"
  },
  {
    id: 3,
    name: "VoltPoint",
    location: "Hyderabad",
    chargerType: "DC Fast Charger",
    availableSlots: 0,
    status: "Full"
  }
];

// ===============================
// BOOKINGS
// ===============================

let bookings = [];

// Home API
app.get("/", (req, res) => {
  res.json({
    message: "EV Charging Station Backend is running!"
  });
});

// Get all stations
app.get("/api/stations", (req, res) => {
  res.json(stations);
});

// Get one station
app.get("/api/stations/:id", (req, res) => {
  const stationId = Number(req.params.id);

  const station = stations.find(
    (station) => station.id === stationId
  );

  if (!station) {
    return res.status(404).json({
      message: "Charging station not found"
    });
  }

  res.json(station);
});

// ===============================
// CREATE BOOKING
// ===============================

app.post("/api/bookings", (req, res) => {
  const {
    userName,
    contact,
    stationId,
    date,
    time,
    vehicleNumber
  } = req.body;

  if (
    !userName ||
    !contact ||
    !stationId ||
    !date ||
    !time ||
    !vehicleNumber
  ) {
    return res.status(400).json({
      message: "All booking fields are required"
    });
  }

  const station = stations.find(
    (station) => station.id === Number(stationId)
  );

  if (!station) {
    return res.status(404).json({
      message: "Charging station not found"
    });
  }

  if (station.availableSlots <= 0) {
    return res.status(400).json({
      message: "No charging slots are available at this station"
    });
  }

  const slotAlreadyBooked = bookings.some(
    (booking) =>
      booking.stationId === Number(stationId) &&
      booking.date === date &&
      booking.time === time
  );

  if (slotAlreadyBooked) {
    return res.status(400).json({
      message:
        "This time slot is already booked. Please select another time."
    });
  }

  const newBooking = {
    id: bookings.length + 1,
    userName,
    contact,
    stationId: Number(stationId),
    date,
    time,
    vehicleNumber
  };

  bookings.push(newBooking);

  station.availableSlots -= 1;

  if (station.availableSlots === 0) {
    station.status = "Full";
  } else {
    station.status = "Available";
  }

  res.status(201).json({
    message: "Booking created successfully",
    booking: newBooking
  });
});

// ===============================
// GET BOOKINGS
// ===============================

app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});

// Get one booking
app.get("/api/bookings/:id", (req, res) => {
  const bookingId = Number(req.params.id);

  const booking = bookings.find(
    (booking) => booking.id === bookingId
  );

  if (!booking) {
    return res.status(404).json({
      message: "Booking not found"
    });
  }

  res.json(booking);
});

// ===============================
// UPDATE BOOKING
// ===============================

app.put("/api/bookings/:id", (req, res) => {
  const bookingId = Number(req.params.id);

  const booking = bookings.find(
    (booking) => booking.id === bookingId
  );

  if (!booking) {
    return res.status(404).json({
      message: "Booking not found"
    });
  }

  const {
    userName,
    contact,
    date,
    time,
    vehicleNumber
  } = req.body;

  if (
    !userName ||
    !contact ||
    !date ||
    !time ||
    !vehicleNumber
  ) {
    return res.status(400).json({
      message: "All booking fields are required"
    });
  }

  const slotAlreadyBooked = bookings.some(
    (existingBooking) =>
      existingBooking.id !== bookingId &&
      existingBooking.stationId === booking.stationId &&
      existingBooking.date === date &&
      existingBooking.time === time
  );

  if (slotAlreadyBooked) {
    return res.status(400).json({
      message:
        "This time slot is already booked. Please select another time."
    });
  }

  booking.userName = userName;
  booking.contact = contact;
  booking.date = date;
  booking.time = time;
  booking.vehicleNumber = vehicleNumber;

  res.json({
    message: "Booking updated successfully",
    booking: booking
  });
});

// ===============================
// CANCEL BOOKING
// ===============================

app.delete("/api/bookings/:id", (req, res) => {
  const bookingId = Number(req.params.id);

  const bookingIndex = bookings.findIndex(
    (booking) => booking.id === bookingId
  );

  if (bookingIndex === -1) {
    return res.status(404).json({
      message: "Booking not found"
    });
  }

  const booking = bookings[bookingIndex];

  const station = stations.find(
    (station) => station.id === booking.stationId
  );

  if (station) {
    station.availableSlots += 1;

    if (station.availableSlots > 0) {
      station.status = "Available";
    }
  }

  bookings.splice(bookingIndex, 1);

  res.json({
    message: "Booking cancelled successfully",
    booking: booking
  });
});



const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

