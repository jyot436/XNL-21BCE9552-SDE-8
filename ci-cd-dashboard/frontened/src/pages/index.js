import { useState, useEffect } from "react";

const Home = () => {
    const [jobName, setJobName] = useState("MyProject"); // Your Jenkins job name
    const [jobStatus, setJobStatus] = useState(null);

    // Fetch Jenkins job status
    const fetchJobStatus = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/job-status/${jobName}`);
            const data = await response.json();
            setJobStatus(data);
        } catch (error) {
            console.error("Error fetching job status:", error);
        }
    };

    // Trigger Jenkins build
    const triggerBuild = async () => {
        try {
            await fetch(`http://localhost:5000/api/build/${jobName}`, { method: "POST" });
            alert("Build triggered successfully!");
        } catch (error) {
            console.error("Error triggering build:", error);
        }
    };

    useEffect(() => {
        fetchJobStatus();
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>CI/CD Dashboard</h1>
            <button onClick={triggerBuild} style={{ padding: "10px", margin: "10px" }}>Trigger Build</button>
            <h2>Job Status</h2>
            {jobStatus ? (
                <div>
                    <p><strong>Job Name:</strong> {jobName}</p>
                    <p><strong>Status:</strong> {jobStatus.result || "Running..."}</p>
                    <p><strong>Timestamp:</strong> {new Date(jobStatus.timestamp).toLocaleString()}</p>
                </div>
            ) : <p>Loading...</p>}
        </div>
    );
};

export default Home;
