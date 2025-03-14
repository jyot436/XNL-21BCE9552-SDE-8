"use client";
import { useState } from "react";

export default function Dashboard() {
  const [buildStatus, setBuildStatus] = useState("Pending");
  const [testCoverage, setTestCoverage] = useState(75);
  const [deployStatus, setDeployStatus] = useState("Not Deployed");

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>🚀 CI/CD Dashboard</h1>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h2>Build Status</h2>
          <p style={{ ...styles.status, color: buildStatus === "Successful" ? "green" : "red" }}>
            {buildStatus}
          </p>
          <button onClick={() => setBuildStatus("Successful")} style={styles.button}>
            Run Build
          </button>
        </div>

        <div style={styles.card}>
          <h2>Test Coverage</h2>
          <p>{testCoverage}%</p>
          <button onClick={() => setTestCoverage(testCoverage + 5)} style={styles.button}>
            Improve Coverage
          </button>
        </div>

        <div style={styles.card}>
          <h2>Deployment Status</h2>
          <p style={{ ...styles.status, color: deployStatus === "Deployed" ? "green" : "red" }}>
            {deployStatus}
          </p>
          <button onClick={() => setDeployStatus("Deployed")} style={styles.button}>
            Deploy Now
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", padding: "20px", fontFamily: "Arial" },
  header: { color: "#0070f3", fontSize: "28px" },
  cardContainer: { display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" },
  card: { border: "1px solid #ddd", padding: "20px", borderRadius: "8px", width: "200px", textAlign: "center" },
  button: { padding: "10px", cursor: "pointer", background: "#0070f3", color: "#fff", border: "none", borderRadius: "5px" },
  status: { fontWeight: "bold" }
};
