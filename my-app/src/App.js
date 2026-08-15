import React, { useState } from "react";

function App() {
  const [students, setStudents] = useState([]);

  const loadStudents = async () => {
    try {
      const response = await fetch("http://localhost:3000/usersList");
      const data = await response.json();

      console.log(data);
      setStudents(data);
    } catch (error) {
      console.error("Error loading students:", error);
    }
  };

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h1>Student Records</h1>

      <button onClick={loadStudents}>
        Load Students
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {students.map((student, index) => (
          <div
            key={index}
            style={{
              border: "1px solid black",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "left",
            }}
          >
            <h2>{student.name}</h2>
            <p>Age: {student.age}</p>
            <p>Mobile: {student.mobile}</p>
            <p>Department: {student.Department}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;