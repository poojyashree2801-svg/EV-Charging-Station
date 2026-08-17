
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  // ===============================
  // LOGIN / REGISTER
  // ===============================

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("evUser") ? true : false
  );

  const [showRegister, setShowRegister] = useState(false);
  const [authMessage, setAuthMessage] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("evUser")) || null
  );

  // ===============================
  // DASHBOARD
  // ===============================

  const [stations, setStations] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStation, setSelectedStation] = useState(null);

  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    userName: "",
    contact: "",
    stationId: "",
    date: "",
    time: "",
    vehicleNumber: ""
  });

  // ===============================
  // STATION DETAILS
  // ===============================

  const stationDetails = {
    1: {
      image: "/Bangalore.png",
      rating: 4.7,
      description:
        "Green Charge Hub is a modern EV charging station in Bangalore with fast charging facilities.",
      facilities: ["DC Fast Charging", "Parking", "24/7 Access"],
      price: "₹15 per kWh",
      timeSlots: ["06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"]
    },

    2: {
      image: "/Chennai.png",
      rating: 4.4,
      description:
        "EcoCharge Station provides reliable AC charging in Chennai with convenient access.",
      facilities: ["AC Charging", "Parking", "Easy Access"],
      price: "₹10 per kWh",
      timeSlots: ["07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"]
    },

    3: {
      image: "/Hyderbad.png",
      rating: 4.2,
      description:
        "VoltPoint is a DC fast charging station in Hyderabad with convenient charging facilities.",
      facilities: ["DC Fast Charging", "Parking", "Fast Charging"],
      price: "₹15 per kWh",
      timeSlots: ["06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM"]
    },

    4: {
      image: "/Manalore.png",
      rating: 4.6,
      description:
        "Mangalore EV Hub provides fast and convenient EV charging facilities.",
      facilities: ["DC Fast Charging", "Parking", "24/7 Access"],
      price: "₹14 per kWh",
      timeSlots: ["06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM"]
    },

    5: {
      image: "/Mysore.png",
      rating: 4.5,
      description:
        "Mysore Green Charge offers reliable AC charging with convenient parking.",
      facilities: ["AC Charging", "Parking", "Easy Access"],
      price: "₹11 per kWh",
      timeSlots: ["07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM"]
    },

    6: {
      image: "/pune.jpg",
      rating: 4.8,
      description:
        "Pune EV Power is a high-speed charging station designed for quick EV charging.",
      facilities: ["DC Fast Charging", "Parking", "24/7 Access"],
      price: "₹16 per kWh",
      timeSlots: ["06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"]
    },

    7: {
      image: "/Mumbai.png",
      rating: 4.6,
      description:
        "Mumbai Charge Point provides fast EV charging in a convenient location.",
      facilities: ["DC Fast Charging", "Parking", "Security"],
      price: "₹17 per kWh",
      timeSlots: ["06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM"]
    },

    8: {
      image: "/Delhi.png",
      rating: 4.5,
      description:
        "Delhi EV Station provides dependable DC fast charging facilities.",
      facilities: ["DC Fast Charging", "Parking", "24/7 Access"],
      price: "₹16 per kWh",
      timeSlots: ["06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM"]
    },

    9: {
      image: "/Kochi.png",
      rating: 4.4,
      description:
        "Kochi Eco Charge offers comfortable and reliable AC charging.",
      facilities: ["AC Charging", "Parking", "Waiting Area"],
      price: "₹12 per kWh",
      timeSlots: ["07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM"]
    },

    10: {
      image: "/coimbate.png",
      rating: 4.6,
      description:
        "Coimbatore EV Hub provides fast charging and convenient facilities.",
      facilities: ["DC Fast Charging", "Parking", "Cafe"],
      price: "₹14 per kWh",
      timeSlots: ["06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM"]
    },

    11: {
      image: "/ahmedbad.png",
      rating: 4.5,
      description:
        "Ahmedabad Charge Station provides reliable DC fast charging.",
      facilities: ["DC Fast Charging", "Parking", "Security"],
      price: "₹15 per kWh",
      timeSlots: ["06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM"]
    },

    12: {
      image: "/jaipur.png",
      rating: 4.3,
      description:
        "Jaipur Green Power provides convenient AC charging facilities.",
      facilities: ["AC Charging", "Parking", "Waiting Area"],
      price: "₹11 per kWh",
      timeSlots: ["07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM"]
    },

    13: {
      image: "/kolkata.png",
      rating: 4.4,
      description:
        "Kolkata EV Point provides dependable DC fast charging facilities.",
      facilities: ["DC Fast Charging", "Parking", "24/7 Access"],
      price: "₹15 per kWh",
      timeSlots: ["06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM"]
    },

    14: {
      image: "/car.jpg",
      rating: 4.7,
      description:
        "Goa EV Charge provides convenient charging facilities for EV owners.",
      facilities: ["AC Charging", "Parking", "Cafe"],
      price: "₹13 per kWh",
      timeSlots: ["07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"]
    },

    15: {
      image: "/lucknow.png",
      rating: 4.5,
      description:
        "Lucknow EV Hub provides fast and reliable EV charging facilities.",
      facilities: ["DC Fast Charging", "Parking", "24/7 Access"],
      price: "₹14 per kWh",
      timeSlots: ["06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM"]
    }
  };

  // ===============================
  // LOGIN
  // ===============================

  const handleLogin = (event) => {
    event.preventDefault();
    setAuthMessage("");

    if (!loginData.email || !loginData.password) {
      setAuthMessage("Please enter your email and password.");
      return;
    }

    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.user) {
          setAuthMessage(data.message || "Login failed.");
          return;
        }

        localStorage.setItem("evUser", JSON.stringify(data.user));
        setCurrentUser(data.user);
        setIsLoggedIn(true);

        setLoginData({
          email: "",
          password: ""
        });
      })
      .catch(() => {
        setAuthMessage("Unable to connect to the server.");
      });
  };

  // ===============================
  // REGISTER
  // ===============================

  const handleRegister = (event) => {
    event.preventDefault();
    setAuthMessage("");

    if (
      !registerData.fullName ||
      !registerData.email ||
      !registerData.phone ||
      !registerData.password ||
      !registerData.confirmPassword
    ) {
      setAuthMessage("Please fill in all fields.");
      return;
    }

    if (!/^\d{10}$/.test(registerData.phone)) {
      setAuthMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    if (registerData.password.length < 6) {
      setAuthMessage("Password must contain at least 6 characters.");
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setAuthMessage("Passwords do not match.");
      return;
    }

    fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(registerData)
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.user) {
          setAuthMessage(data.message || "Registration failed.");
          return;
        }

        setAuthMessage("Registration successful! Please login.");
        setShowRegister(false);

        setRegisterData({
          fullName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: ""
        });
      })
      .catch(() => {
        setAuthMessage("Unable to connect to the server.");
      });
  };

  // ===============================
  // LOGOUT
  // ===============================

  const handleLogout = () => {
    localStorage.removeItem("evUser");
    setCurrentUser(null);
    setIsLoggedIn(false);
    setSelectedStation(null);
    setBookings([]);
    setConfirmedBooking(null);
  };

  // ===============================
  // FETCH DATA
  // ===============================

  const fetchStations = () => {
    fetch("http://localhost:5000/api/stations")
      .then((response) => response.json())
      .then((data) => {
        setStations(data);
        setLoading(false);
      })
      .catch(() => {
        setMessage("Unable to load charging stations.");
        setLoading(false);
      });
  };

  const fetchBookings = () => {
    fetch("http://localhost:5000/api/bookings")
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch(() => {
        setMessage("Unable to load bookings.");
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchStations();
      fetchBookings();
    }
  }, [isLoggedIn]);

  // ===============================
  // SEARCH
  // ===============================

  const filteredStations = stations.filter((station) =>
    station.location
      ?.toLowerCase()
      .includes(searchLocation.trim().toLowerCase())
  );

  // ===============================
  // BOOKING
  // ===============================

  const handleStationSelect = (station) => {
    setSelectedStation(station);

    setFormData((previous) => ({
      ...previous,
      stationId: station.id,
      userName: currentUser?.fullName || "",
      contact: currentUser?.phone || "",
      time: ""
    }));

    setMessage("");
  };

  const handleTimeSlotSelect = (time) => {
    setFormData((previous) => ({
      ...previous,
      time
    }));
  };

  const isSlotBooked = (stationId, time) => {
    if (!formData.date) return false;

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
        if (data.booking) {
          // IMPORTANT:
          // Store the complete booking returned by backend.
          setConfirmedBooking(data.booking);

          setMessage("Booking confirmed successfully!");

          fetchBookings();
          fetchStations();

          setFormData({
            userName: currentUser?.fullName || "",
            contact: currentUser?.phone || "",
            stationId: "",
            date: "",
            time: "",
            vehicleNumber: ""
          });

          setSelectedStation(null);

          // Scroll to confirmation
          setTimeout(() => {
            document
              .getElementById("booking-confirmation")
              ?.scrollIntoView({
                behavior: "smooth",
                block: "center"
              });
          }, 200);
        } else {
          setMessage(data.message || "Booking failed.");
        }
      })
      .catch(() => {
        setMessage("Booking failed. Please try again.");
      });
  };

  // ===============================
  // CANCEL
  // ===============================

  const cancelBooking = (id) => {
    fetch(`http://localhost:5000/api/bookings/${id}`, {
      method: "DELETE"
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        fetchBookings();
        fetchStations();

        if (confirmedBooking?.id === id) {
          setConfirmedBooking(null);
        }
      })
      .catch(() => {
        setMessage("Cancellation failed.");
      });
  };

  // ===============================
  // AUTH PAGE
  // ===============================

  if (!isLoggedIn) {
    return (
      <div className="auth-page">
        <div className="auth-card">

          <div className="auth-logo">⚡</div>

          <h1>EV Charging Station</h1>

          <p className="auth-subtitle">
            {showRegister
              ? "Create your account"
              : "Welcome back! Login to continue"}
          </p>

          {showRegister ? (
            <form className="auth-form" onSubmit={handleRegister}>

              <h2>📝 Create Account</h2>

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={registerData.fullName}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    fullName: e.target.value
                  })
                }
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    email: e.target.value
                  })
                }
              />

              <input
                type="text"
                name="phone"
                placeholder="10-digit Phone Number"
                value={registerData.phone}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    phone: e.target.value
                  })
                }
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    password: e.target.value
                  })
                }
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={registerData.confirmPassword}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    confirmPassword: e.target.value
                  })
                }
              />

              <button type="submit">Register</button>

              <p className="auth-switch">
                Already have an account?

                <button
                  type="button"
                  className="link-button"
                  onClick={() => {
                    setShowRegister(false);
                    setAuthMessage("");
                  }}
                >
                  Login
                </button>
              </p>

            </form>
          ) : (
            <form className="auth-form" onSubmit={handleLogin}>

              <h2>🔐 Login</h2>

              <input
                type="email"
                placeholder="Email Address"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    email: e.target.value
                  })
                }
              />

              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    password: e.target.value
                  })
                }
              />

              <button type="submit">Login</button>

              <p className="auth-switch">
                Don't have an account?

                <button
                  type="button"
                  className="link-button"
                  onClick={() => {
                    setShowRegister(true);
                    setAuthMessage("");
                  }}
                >
                  Register
                </button>
              </p>

            </form>
          )}

          {authMessage && (
            <div className="auth-message">
              {authMessage}
            </div>
          )}

        </div>
      </div>
    );
  }

  // ===============================
  // DASHBOARD
  // ===============================

  return (
    <div className="App">

      {/* HEADER */}

      <header className="dashboard-header">

        <div className="header-top">
          <div className="header-icon">⚡</div>

          <div className="user-info">
            <strong>Welcome, {currentUser?.fullName}</strong>
            <span>📧 {currentUser?.email}</span>
            <span>📱 {currentUser?.phone}</span>
          </div>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <h1>EV Charging Station</h1>

        <p>
          Find, select and book your EV charging station
        </p>

      </header>

      {/* STATIONS */}

      <section className="dashboard-section">

        <div className="section-heading">

          <div>
            <span className="section-label">EXPLORE</span>
            <h2>🔌 Charging Stations</h2>

            <div className="location-search">

              <input
                type="text"
                placeholder="🔍 Enter city or place name"
                value={searchLocation}
                onChange={(e) =>
                  setSearchLocation(e.target.value)
                }
              />

              <button
                type="button"
                onClick={() =>
                  setSearchLocation(searchLocation.trim())
                }
              >
                Search
              </button>

              <button
                type="button"
                className="clear-search-button"
                onClick={() => setSearchLocation("")}
              >
                Clear
              </button>

            </div>
          </div>

          <span className="station-count">
            {filteredStations.length} Stations
          </span>

        </div>

        {loading ? (
          <div className="loading-box">
            Loading charging stations...
          </div>
        ) : filteredStations.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No charging stations found</h3>
            <p>
              No charging stations are available in
              "{searchLocation}".
            </p>
            <button onClick={() => setSearchLocation("")}>
              Show All Stations
            </button>
          </div>
        ) : (
          <div className="stations">

            {filteredStations.map((station) => {

              const details = stationDetails[station.id];

              return (
                <div
                  className="station-card"
                  key={station.id}
                >

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

                    <p className="card-price">
                      💰 {details?.price}
                    </p>

                    <button
                      className="details-button"
                      onClick={() =>
                        handleStationSelect(station)
                      }
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

      {/* DETAILS */}

      {selectedStation && (

        <section className="station-details">

          <div className="details-top">

            <div>
              <span className="section-label">
                STATION INFORMATION
              </span>

              <h2>
                📍 {selectedStation.name}
              </h2>
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
                    <span key={facility}>
                      ✓ {facility}
                    </span>
                  )
                )}
              </div>

            </div>

          </div>

          <div className="slots-section">

            <h3>🕐 Select an Available Time Slot</h3>

            {!formData.date && (
              <p className="slot-note">
                Please select a booking date below first.
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
                      onClick={() =>
                        handleTimeSlotSelect(time)
                      }
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

      {/* BOOKING FORM */}

      <section className="booking-section">

        <div className="section-heading">

          <div>
            <span className="section-label">
              RESERVATION
            </span>

            <h2>📝 Book a Charging Slot</h2>
          </div>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Your Name</label>

            <input
              type="text"
              value={formData.userName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  userName: e.target.value
                })
              }
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label>Contact Number</label>

            <input
              type="text"
              value={formData.contact}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact: e.target.value
                })
              }
              placeholder="10-digit contact number"
            />
          </div>

          <div className="form-group">
            <label>Vehicle Number</label>

            <input
              type="text"
              value={formData.vehicleNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  vehicleNumber: e.target.value
                })
              }
              placeholder="Example: KA01AB1234"
            />
          </div>

          <div className="form-group">
            <label>Charging Station</label>

            <select
              value={formData.stationId}
              onChange={(e) => {

                const station = stations.find(
                  (item) =>
                    item.id === Number(e.target.value)
                );

                if (station) {
                  handleStationSelect(station);
                }

              }}
            >
              <option value="">
                Select Station
              </option>

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
              min={new Date().toISOString().split("T")[0]}
              value={formData.date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  date: e.target.value,
                  time: ""
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Time Slot</label>

            <select
              value={formData.time}
              disabled={!selectedStation || !formData.date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  time: e.target.value
                })
              }
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
                  (time) => {

                    const booked = isSlotBooked(
                      selectedStation.id,
                      time
                    );

                    return (
                      <option
                        key={time}
                        value={time}
                        disabled={booked}
                      >
                        {time} {booked ? "- Booked" : "- Available"}
                      </option>
                    );
                  }
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
            ⚡ Confirm Charging Booking
          </button>

        </form>

      </section>

      {/* ===============================
          IMPROVED BOOKING CONFIRMATION
          =============================== */}

      {confirmedBooking && (

        <section
          id="booking-confirmation"
          className="booking-confirmation"
        >

          <div className="success-circle">
            ✓
          </div>

          <h2>Booking Confirmed!</h2>

          <p className="success-text">
            Your EV charging slot has been successfully reserved.
          </p>

          <div className="booking-id-box">
            <span>BOOKING ID</span>
            <strong>#{confirmedBooking.id}</strong>
          </div>

          <div className="confirmation-grid">

            <div className="confirmation-item">
              <span>🔌 Charging Station</span>

              <strong>
                {stations.find(
                  (station) =>
                    station.id ===
                    Number(confirmedBooking.stationId)
                )?.name || "Charging Station"}
              </strong>
            </div>

            <div className="confirmation-item">
              <span>📅 Booking Date</span>

              <strong>
                {confirmedBooking.date}
              </strong>
            </div>

            <div className="confirmation-item">
              <span>🕐 Time Slot</span>

              <strong>
                {confirmedBooking.time}
              </strong>
            </div>

            <div className="confirmation-item">
              <span>🚗 Vehicle Number</span>

              <strong>
                {confirmedBooking.vehicleNumber}
              </strong>
            </div>

            <div className="confirmation-item">
              <span>👤 Customer</span>

              <strong>
                {confirmedBooking.userName}
              </strong>
            </div>

            <div className="confirmation-item">
              <span>📞 Contact</span>

              <strong>
                {confirmedBooking.contact}
              </strong>
            </div>

          </div>

          <div className="confirmation-note">
            <strong>⚡ Please arrive on time.</strong>
            <br />
            Your charging slot has been reserved successfully.
          </div>

          <button
            className="confirmation-close"
            onClick={() => setConfirmedBooking(null)}
          >
            Close Confirmation
          </button>

        </section>

      )}

      {/* MESSAGE */}

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

      {/* MY BOOKINGS */}

      <section className="bookings-section">

        <div className="section-heading">

          <div>
            <span className="section-label">
              YOUR RESERVATIONS
            </span>

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

            <p>
              Your confirmed charging reservations will appear here.
            </p>
          </div>

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

      <footer>
        <p>
          ⚡ EV Charging Station • Developed by Poojyashree
        </p>
      </footer>

    </div>
  );
}

export default App;

