require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const JENKINS_URL = process.env.JENKINS_URL;   // Jenkins URL
const JENKINS_USER = process.env.JENKINS_USER; // Username
const JENKINS_TOKEN = process.env.JENKINS_TOKEN; // API Token

// Fetch Jenkins job status
app.get("/api/job-status/:jobName", async (req, res) => {
    const { jobName } = req.params;
    try {
        const response = await axios.get(`${JENKINS_URL}/job/${jobName}/lastBuild/api/json`, {
            auth: { username: JENKINS_USER, password: JENKINS_TOKEN }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch job status" });
    }
});

// Trigger Jenkins build
app.post("/api/build/:jobName", async (req, res) => {
    const { jobName } = req.params;
    try {
        await axios.post(`${JENKINS_URL}/job/${jobName}/build`, {}, {
            auth: { username: JENKINS_USER, password: JENKINS_TOKEN }
        });
        res.json({ message: "Build triggered successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to trigger build" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
