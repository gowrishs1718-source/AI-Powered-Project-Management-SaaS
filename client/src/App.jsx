

import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Connecting to backend...");

  useEffect(() => {
    async function checkBackend() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/health"
        );

        if (!response.ok) {
          throw new Error("Backend request failed");
        }

        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        setMessage("Backend connection failed!");
        console.error(error);
      }
    }

    checkBackend();
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Project Management SaaS</h1>
      <h2>Day 1: Full-Stack Setup</h2>
      <p>Backend status: {message}</p>
    </div>
  );
}

export default App;
