

import React, { useEffect, useState } from "react";
import "./App.css";


function App() {
  const [stations, setStations] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStation, setSelectedStation] = useState(null);

  const [formData, setFormData] = useState({
    userName: "",
    contact: "",
    stationId: "",
    date: "",
    time: "",
    vehicleNumber: ""
  });

  const [message, setMessage] = useState("");

  // Station images, ratings and information
  const stationDetails = {
    1: {
      image:
        "./car.jpg",
      rating: 4.7,
      description:
        "Green Charge Hub is a modern EV charging station in Bangalore with fast charging facilities and convenient access for EV owners.",
      facilities: ["DC Fast Charging", "Parking", "24/7 Access"],
      price: "₹15 per kWh",
      timeSlots: [
        "06:00 AM",
        "07:00 AM",
        "08:00 AM",
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM"
      ]
    },
    2: {
      image:
        "./charger.jpg",
      rating: 4.4,
      description:
        "EcoCharge Station provides reliable AC charging in Chennai with a comfortable location for EV users.",
      facilities: ["AC Charging", "Parking", "Easy Access"],
      price: "₹10 per kWh",
      timeSlots: [
        "07:00 AM",
        "08:00 AM",
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM"
      ]
    },
    3: {
      image:
        "./charger2.jpg",
      rating: 4.2,
      description:
        "VoltPoint is a DC fast charging station in Hyderabad. It is currently fully occupied.",
      facilities: ["DC Fast Charging", "Parking", "Fast Charging"],
      price: "₹15 per kWh",
      timeSlots: [
        "06:00 AM",
        "07:00 AM",
        "08:00 AM",
        "09:00 AM",
        "10:00 AM"
      ]
    }
  };

  // Get charging stations
  const fetchStations = () => {
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
  };

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

  useEffect(() => {
    fetchStations();
  }, []);

  // Handle form changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Select station
  const handleStationSelect = (station) => {
    setSelectedStation(station);

    setFormData({
      ...formData,
      stationId: station.id,
      time: ""
    });

    setMessage("");
  };

  // Select time slot
  const handleTimeSlotSelect = (time) => {
    setFormData({
      ...formData,
      stationId: selectedStation.id,
      time
    });

    setMessage("");
  };

  // Create booking
  const handleSubmit = (event) => {
    event.preventDefault();

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
          fetchStations();

          setFormData({
            userName: "",
            contact: "",
            stationId: "",
            date: "",
            time: "",
            vehicleNumber: ""
          });

          setSelectedStation(null);
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
        fetchStations();
      })
      .catch((error) => {
        console.error("Cancellation error:", error);
        setMessage("Cancellation failed.");
      });
  };

  // Check whether a time slot is already booked
  const isSlotBooked = (stationId, time) => {
    return bookings.some(
      (booking) =>
        Number(booking.stationId) === Number(stationId) &&
        booking.time === time
    );
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="dashboard-header">
        <h1>⚡ EV Charging Station</h1>
        <p>Find, select and book your EV charging station</p>
      </header>

      {/* Charging Stations */}
      <section className="dashboard-section">
        <h2>🔌 Charging Stations</h2>

        {loading ? (
          <p>Loading charging stations...</p>
        ) : (
          <div className="stations">
            {stations.map((station) => {
              const details = stationDetails[station.id];

              return (
                <div className="station-card" key={station.id}>
                  <img
                    src={details?.image}
                    alt={station.name}
                    className="station-image"
                  />

                  <div className="station-content">
                    <h3>{station.name}</h3>

                    <p>
                      <strong>📍 Location:</strong> {station.location}
                    </p>

                    <p>
                      <strong>⚡ Charger:</strong> {station.chargerType}
                    </p>

                    <p>
                      <strong>⭐ Rating:</strong>{" "}
                      {details?.rating || "N/A"} / 5
                    </p>

                    <p>
                      <strong>Available Slots:</strong>{" "}
                      {station.availableSlots}
                    </p>

                    <p
                      className={
                        station.availableSlots > 0
                          ? "available"
                          : "full"
                      }
                    >
                      {station.availableSlots > 0
                        ? "🟢 Available"
                        : "🔴 Full"}
                    </p>

                    <button
                      className="details-button"
                      onClick={() => handleStationSelect(station)}
                    >
                      View Details & Book
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Selected Station Details */}
      {selectedStation && (
        <section className="station-details">
          <h2>📍 Station Details</h2>

          <div className="details-container">
            <img
              src={stationDetails[selectedStation.id]?.image}
              alt={selectedStation.name}
              className="details-image"
            />

            <div className="details-info">
              <h2>{selectedStation.name}</h2>

              <p>
                <strong>Location:</strong>{" "}
                {selectedStation.location}
              </p>

              <p>
                <strong>Charger Type:</strong>{" "}
                {selectedStation.chargerType}
              </p>

              <p>
                <strong>Rating:</strong> ⭐{" "}
                {stationDetails[selectedStation.id]?.rating} / 5
              </p>

              <p>
                <strong>Price:</strong>{" "}
                {stationDetails[selectedStation.id]?.price}
              </p>

              <p>
                <strong>Available Slots:</strong>{" "}
                {selectedStation.availableSlots}
              </p>

              <p>
                {stationDetails[selectedStation.id]?.description}
              </p>

              <h3>Facilities</h3>

              <ul>
                {stationDetails[selectedStation.id]?.facilities.map(
                  (facility) => (
                    <li key={facility}>{facility}</li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Time Slots */}
          <h3 className="slot-heading">
            🕐 Select an Available Time Slot
          </h3>

          <div className="time-slots">
            {stationDetails[selectedStation.id]?.timeSlots.map(
              (time) => {
                const booked = isSlotBooked(
                  selectedStation.id,
                  time
                );

                const selected = formData.time === time;

                return (
                  <button
                    key={time}
                    type="button"
                    disabled={
                      booked ||
                      selectedStation.availableSlots === 0
                    }
                    className={`time-slot ${
                      selected ? "selected-slot" : ""
                    } ${booked ? "booked-slot" : ""}`}
                    onClick={() =>
                      handleTimeSlotSelect(time)
                    }
                  >
                    {time}
                    <span>
                      {booked
                        ? "Booked"
                        : selected
                        ? "Selected"
                        : "Available"}
                    </span>
                  </button>
                );
              }
            )}
          </div>

          <button
            className="close-button"
            onClick={() => {
              setSelectedStation(null);
              setFormData({
                ...formData,
                stationId: "",
                time: ""
              });
            }}
          >
            Close Station Details
          </button>
        </section>
      )}

      {/* Booking Form */}
      <section className="booking-section">
        <h2>📝 Book a Charging Slot</h2>

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

          <input
            type="text"
            name="vehicleNumber"
            placeholder="Vehicle Number"
            value={formData.vehicleNumber}
            onChange={handleChange}
          />

          <select
            name="stationId"
            value={formData.stationId}
            onChange={(event) => {
              handleChange(event);

              const station = stations.find(
                (item) =>
                  item.id === Number(event.target.value)
              );

              if (station) {
                setSelectedStation(station);
              }
            }}
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

          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            disabled={!selectedStation}
          >
            <option value="">
              {selectedStation
                ? "Select Time Slot"
                : "Select Station First"}
            </option>

            {selectedStation &&
              stationDetails[selectedStation.id]?.timeSlots.map(
                (time) => (
                  <option
                    key={time}
                    value={time}
                    disabled={isSlotBooked(
                      selectedStation.id,
                      time
                    )}
                  >
                    {time}
                    {isSlotBooked(
                      selectedStation.id,
                      time
                    )
                      ? " - Booked"
                      : " - Available"}
                  </option>
                )
              )}
          </select>

          <button
            type="submit"
            disabled={
              !selectedStation ||
              selectedStation.availableSlots === 0
            }
          >
            Book Charging Slot
          </button>
        </form>
      </section>

      {/* Message */}
      {message && (
        <div className="message">
          {message}
        </div>
      )}

      {/* My Bookings */}
      <section className="bookings-section">
        <h2>📋 My Bookings</h2>

        <button
          className="view-bookings-button"
          onClick={fetchBookings}
        >
          View Bookings
        </button>

        {bookings.length === 0 ? (
          <p>No bookings available.</p>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => {
              const station = stations.find(
                (item) =>
                  item.id === Number(booking.stationId)
              );

              return (
                <div
                  className="booking-card"
                  key={booking.id}
                >
                  <h3>Booking #{booking.id}</h3>

                  <p>
                    <strong>Name:</strong>{" "}
                    {booking.userName}
                  </p>

                  <p>
                    <strong>Contact:</strong>{" "}
                    {booking.contact}
                  </p>

                  <p>
                    <strong>Station:</strong>{" "}
                    {station
                      ? station.name
                      : `Station ${booking.stationId}`}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {booking.date}
                  </p>

                  <p>
                    <strong>Time:</strong>{" "}
                    {booking.time}
                  </p>

                  <p>
                    <strong>Vehicle:</strong>{" "}
                    {booking.vehicleNumber}
                  </p>

                  <button
                    className="cancel-button"
                    onClick={() =>
                      cancelBooking(booking.id)
                    }
                  >
                    Cancel Booking
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;

