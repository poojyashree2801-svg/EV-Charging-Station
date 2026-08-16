
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [stations, setStations] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    userName: "",
    contact: "",
    stationId: "",
    date: "",
    time: "",
    vehicleNumber: ""
  });

  const [message, setMessage] = useState("");

  // Get charging stations
  useEffect(() => {
    fetch("http://localhost:5000/api/stations")
      .then((response) => response.json())
      .then((data) => {
        setStations(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching stations:", error);
        setMessage("Unable to load charging stations.");
        setLoading(false);
      });
  }, []);

  // Get all bookings
  const fetchBookings = () => {
    fetch("http://localhost:5000/api/bookings")
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setMessage("Unable to load bookings.");
      });
  };

  // Handle input changes
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  // Create booking
  const handleSubmit = (event) => {
    event.preventDefault();

    // Frontend validation
    if (
      !formData.userName ||
      !formData.contact ||
      !formData.stationId ||
      !formData.date ||
      !formData.time ||
      !formData.vehicleNumber
    ) {
      setMessage("Please fill in all booking fields.");
      return;
    }

    // Contact validation
    if (!/^\d{10}$/.test(formData.contact)) {
      setMessage("Please enter a valid 10-digit contact number.");
      return;
    }

    fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);

        if (data.booking) {
          fetchBookings();

          // Refresh stations so slot count updates
          fetch("http://localhost:5000/api/stations")
            .then((response) => response.json())
            .then((data) => {
              setStations(data);
            });

          setFormData({
            userName: "",
            contact: "",
            stationId: "",
            date: "",
            time: "",
            vehicleNumber: ""
          });
        }
      })
      .catch((error) => {
        console.error("Booking error:", error);
        setMessage("Booking failed. Please try again.");
      });
  };

  // Cancel booking
  const cancelBooking = (id) => {
    fetch(`http://localhost:5000/api/bookings/${id}`, {
      method: "DELETE"
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);

        fetchBookings();

        // Refresh stations so slot count updates
        fetch("http://localhost:5000/api/stations")
          .then((response) => response.json())
          .then((data) => {
            setStations(data);
          });
      })
      .catch((error) => {
        console.error("Cancellation error:", error);
        setMessage("Cancellation failed.");
      });
  };

  return (
    <div className="App">
      <h1>EV Charging Station</h1>

      {/* Charging Stations */}
      <h2>Available Charging Stations</h2>

      {loading ? (
        <p>Loading stations...</p>
      ) : (
        <div className="stations">
          {stations.map((station) => (
            <div className="station-card" key={station.id}>
              <h3>{station.name}</h3>

              <p>
                <strong>Location:</strong> {station.location}
              </p>

              <p>
                <strong>Charger:</strong> {station.chargerType}
              </p>

              <p>
                <strong>Available Slots:</strong>{" "}
                {station.availableSlots}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {station.availableSlots === 0
                  ? "Full"
                  : "Available"}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Booking Form */}
      <h2>Book a Charging Slot</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userName"
          placeholder="Your Name"
          value={formData.userName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="contact"
          placeholder="10-digit Contact Number"
          value={formData.contact}
          onChange={handleChange}
        />

        <select
          name="stationId"
          value={formData.stationId}
          onChange={handleChange}
        >
          <option value="">Select Station</option>

          {stations.map((station) => (
            <option
              key={station.id}
              value={station.id}
              disabled={station.availableSlots === 0}
            >
              {station.name} - {station.availableSlots} slots
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />

        <input
          type="text"
          name="vehicleNumber"
          placeholder="Vehicle Number"
          value={formData.vehicleNumber}
          onChange={handleChange}
        />

        <button type="submit">
          Book Charging Slot
        </button>
      </form>

      {/* Success / Error Message */}
      {message && <p>{message}</p>}

      {/* Bookings */}
      <h2>My Bookings</h2>

      <button onClick={fetchBookings}>
        View Bookings
      </button>

      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking.id}>
            <h3>Booking #{booking.id}</h3>

            <p>
              <strong>Name:</strong> {booking.userName}
            </p>

            <p>
              <strong>Contact:</strong> {booking.contact}
            </p>

            <p>
              <strong>Station ID:</strong> {booking.stationId}
            </p>

            <p>
              <strong>Date:</strong> {booking.date}
            </p>

            <p>
              <strong>Time:</strong> {booking.time}
            </p>

            <p>
              <strong>Vehicle:</strong> {booking.vehicleNumber}
            </p>

            <button
              onClick={() => cancelBooking(booking.id)}
            >
              Cancel Booking
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;

