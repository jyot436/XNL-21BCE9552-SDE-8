import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const App = () => {
  const [buildStatus, setBuildStatus] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    fetch("https://api.example.com/build-status") // Replace with actual API
      .then((response) => response.json())
      .then((data) => {
        setBuildStatus(data.status);
        setLabels(data.timestamps);
      })
      .catch((error) => console.error("Error fetching build status:", error));
  }, []);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Build Success Rate",
        data: buildStatus,
        borderColor: "green",
        fill: false,
      },
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CI/CD Dashboard</h2>
      <Line data={chartData} />
    </div>
  );
};

export default App;
