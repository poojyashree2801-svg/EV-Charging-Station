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

  const stationDetails = {
    1: {
      image: "/car.jpg",
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
      image: "/charger.jpg",
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
      image: "/charger2.jpg",
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

  const fetchStations = () => {
    fetch("http://localhost:5000/api/stations")
      .then((response) => response.json())
      .then((data) => {
        setStations(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setMessage("Unable to load charging stations.");
        setLoading(false);
      });
  };

  const fetchBookings = () => {
    fetch("http://localhost:5000/api/bookings")
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => {
        console.error(error);
        setMessage("Unable to load bookings.");
      });
  };

  useEffect(() => {
    fetchStations();
    fetchBookings();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleStationSelect = (station) => {
    setSelectedStation(station);

    setFormData((previous) => ({
      ...previous,
      stationId: station.id,
      time: ""
    }));

    setMessage("");
  };

  const handleTimeSlotSelect = (time) => {
    setFormData((previous) => ({
      ...previous,
      stationId: selectedStation.id,
      time
    }));

    setMessage("");
  };

  const isSlotBooked = (stationId, time) => {
    if (!formData.date) {
      return false;
    }

    return bookings.some(
      (booking) =>
        Number(booking.stationId) === Number(stationId) &&
        booking.date === formData.date &&
        booking.time === time
    );
  };

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

    if (isSlotBooked(formData.stationId, formData.time)) {
      setMessage("This time slot is already booked.");
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
        console.error(error);
        setMessage("Booking failed. Please try again.");
      });
  };

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
        console.error(error);
        setMessage("Cancellation failed.");
      });
  };

  return (
    <div className="App">
      <header className="dashboard-header">
        <div className="header-icon">⚡</div>
        <h1>EV Charging Station</h1>
        <p>Find, select and book your EV charging station</p>
      </header>

      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <span className="section-label">EXPLORE</span>
            <h2>🔌 Charging Stations</h2>
          </div>
          <span className="station-count">
            {stations.length} Stations
          </span>
        </div>

        {loading ? (
          <div className="loading-box">
            Loading charging stations...
          </div>
        ) : (
          <div className="stations">
            {stations.map((station) => {
              const details = stationDetails[station.id];

              return (
                <div className="station-card" key={station.id}>
                  <div className="image-wrapper">
                    <img
                      src={details?.image}
                      alt={station.name}
                      className="station-image"
                    />

                    <span
                      className={
                        station.availableSlots > 0
                          ? "status-badge available-badge"
                          : "status-badge full-badge"
                      }
                    >
                      {station.availableSlots > 0
                        ? "● Available"
                        : "● Full"}
                    </span>
                  </div>

                  <div className="station-content">
                    <div className="station-title-row">
                      <h3>{station.name}</h3>
                      <span className="rating">
                        ⭐ {details?.rating}
                      </span>
                    </div>

                    <p className="location">
                      📍 {station.location}
                    </p>

                    <div className="station-info">
                      <span>⚡ {station.chargerType}</span>
                      <span>🔋 {station.availableSlots} slots</span>
                    </div>

                    <button
                      className="details-button"
                      onClick={() => handleStationSelect(station)}
                    >
                      View Details & Book →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {selectedStation && (
        <section className="station-details">
          <div className="details-top">
            <div>
              <span className="section-label">STATION INFORMATION</span>
              <h2>📍 {selectedStation.name}</h2>
            </div>

            <button
              className="close-button"
              onClick={() => {
                setSelectedStation(null);
                setFormData((previous) => ({
                  ...previous,
                  stationId: "",
                  time: ""
                }));
              }}
            >
              ✕ Close
            </button>
          </div>

          <div className="details-container">
            <img
              src={stationDetails[selectedStation.id]?.image}
              alt={selectedStation.name}
              className="details-image"
            />

            <div className="details-info">
              <div className="rating-large">
                ⭐ {stationDetails[selectedStation.id]?.rating} / 5
              </div>

              <p>
                <strong>📍 Location:</strong>{" "}
                {selectedStation.location}
              </p>

              <p>
                <strong>⚡ Charger:</strong>{" "}
                {selectedStation.chargerType}
              </p>

              <p>
                <strong>💰 Price:</strong>{" "}
                {stationDetails[selectedStation.id]?.price}
              </p>

              <p>
                <strong>🔋 Available Slots:</strong>{" "}
                {selectedStation.availableSlots}
              </p>

              <p className="description">
                {stationDetails[selectedStation.id]?.description}
              </p>

              <h3>Facilities</h3>

              <div className="facilities">
                {stationDetails[selectedStation.id]?.facilities.map(
                  (facility) => (
                    <span key={facility}>✓ {facility}</span>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="slots-section">
            <h3>🕐 Select an Available Time Slot</h3>

            {!formData.date && (
              <p className="slot-note">
                Please select a date below before choosing a time slot.
              </p>
            )}

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
                        selectedStation.availableSlots === 0 ||
                        !formData.date
                      }
                      className={`time-slot ${
                        selected ? "selected-slot" : ""
                      } ${booked ? "booked-slot" : ""}`}
                      onClick={() => handleTimeSlotSelect(time)}
                    >
                      <strong>{time}</strong>
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
          </div>
        </section>
      )}

      <section className="booking-section">
        <div className="section-heading">
          <div>
            <span className="section-label">RESERVATION</span>
            <h2>📝 Book a Charging Slot</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              name="userName"
              placeholder="Enter your name"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="text"
              name="contact"
              placeholder="10-digit contact number"
              value={formData.contact}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Vehicle Number</label>
            <input
              type="text"
              name="vehicleNumber"
              placeholder="Example: TN01AB1234"
              value={formData.vehicleNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Charging Station</label>
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
          </div>

          <div className="form-group">
            <label>Booking Date</label>
            <input
              type="date"
              name="date"
              min={new Date().toISOString().split("T")[0]}
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Time Slot</label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              disabled={!selectedStation || !formData.date}
            >
              <option value="">
                {!selectedStation
                  ? "Select station first"
                  : !formData.date
                  ? "Select date first"
                  : "Select time slot"}
              </option>

              {selectedStation &&
                formData.date &&
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
          </div>

          <button
            className="booking-button"
            type="submit"
            disabled={
              !selectedStation ||
              selectedStation.availableSlots === 0
            }
          >
            Confirm Charging Booking ⚡
          </button>
        </form>
      </section>

      {message && (
        <div
          className={`message ${
            message.toLowerCase().includes("success")
              ? "success-message"
              : "error-message"
          }`}
        >
          {message}
        </div>
      )}

      <section className="bookings-section">
        <div className="section-heading">
          <div>
            <span className="section-label">YOUR RESERVATIONS</span>
            <h2>📋 My Bookings</h2>
          </div>

          <button
            className="view-bookings-button"
            onClick={fetchBookings}
          >
            Refresh Bookings
          </button>
        </div>

        {bookings.length === 0 ? (
          <div className="empty-bookings">
            <div>🔋</div>
            <h3>No bookings yet</h3>
            <p>Your confirmed charging reservations will appear here.</p>
          </div>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => {
              const station = stations.find(
                (item) =>
                  item.id === Number(booking.stationId)
              );

              return (
                <div className="booking-card" key={booking.id}>
                  <div className="booking-number">
                    Booking #{booking.id}
                  </div>

                  <h3>
                    {station
                      ? station.name
                      : `Station ${booking.stationId}`}
                  </h3>

                  <div className="booking-details">
                    <p>
                      <strong>👤 Name</strong>
                      {booking.userName}
                    </p>

                    <p>
                      <strong>📞 Contact</strong>
                      {booking.contact}
                    </p>

                    <p>
                      <strong>📅 Date</strong>
                      {booking.date}
                    </p>

                    <p>
                      <strong>🕐 Time</strong>
                      {booking.time}
                    </p>

                    <p>
                      <strong>🚗 Vehicle</strong>
                      {booking.vehicleNumber}
                    </p>
                  </div>

                  <button
                    className="cancel-button"
                    onClick={() => cancelBooking(booking.id)}
                  >
                    Cancel Booking
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <footer>
        <p>⚡ EV Charging Station • Developed by Poojyashree</p>
      </footer>
    </div>
  );
}

export default App;