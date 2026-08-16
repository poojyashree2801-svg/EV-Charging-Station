const express = require('express');
const cors = require('cors');
const app = express();

//middleware
app.use(cors());
app.use(express.json());
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
let bookings = [];
//api
app.get('/',(req,res)=>{
    res.json({
        message: "EV Charging Station Backend is running!"
    });
});
app.get('/api/stations', (req, res) => {
    res.json(stations);
});
app.get("/api/stations/:id", (req, res) => {
  const stationId = Number(req.params.id);

  const station = stations.find((station) => station.id === stationId);

  if (!station) {
    return res.status(404).json({
      message: "Charging station not found"
    });
  }

  res.json(station);
});
app.post("/api/bookings", (req, res) => {
  const { userName, contact, stationId, date, time, vehicleNumber } = req.body;

  if (!userName || !contact || !stationId || !date || !time || !vehicleNumber) {
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
  station.availableSlots = station.availableSlots - 1;

  res.status(201).json({
    message: "Booking created successfully",
    booking: newBooking
  });
});

app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});

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

  const { userName, contact, date, time, vehicleNumber } = req.body;

  if (!userName || !contact || !date || !time || !vehicleNumber) {
    return res.status(400).json({
      message: "All booking fields are required"
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

  // Return the slot to the station
  const station = stations.find(
    (station) => station.id === booking.stationId
  );

  if (station) {
    station.availableSlots += 1;
    station.status = "Available";
  }

  bookings.splice(bookingIndex, 1);

  res.json({
    message: "Booking cancelled successfully",
    booking: booking
  });
});

// start the server
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});