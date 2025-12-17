const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const app = express();
const port = 5003;
const JWT_SECRET = "my_secret_key_123"; // change later

app.use(cors());
app.use(express.json());

// DB connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',  // CHANGE THIS
    database: 'job_board_db'
});

db.connect(err => {
    if (err) return console.error("MySQL error:", err);
    console.log("✅ Connected to MySQL");
});

// REGISTER
app.post('/register', async (req, res) => {
    const { username, password, skills } = req.body;
    if (!username || !password || !skills)
        return res.status(400).json({ error: "All fields required" });

    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
        "INSERT INTO users (username, password, skills) VALUES (?, ?, ?)",
        [username, hashedPassword, skills],
        err => {
            if (err) return res.status(500).json({ error: "User exists" });
            res.json({ message: "User registered" });
        }
    );
});

// LOGIN
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    db.query("SELECT * FROM users WHERE username = ?", [username], async (err, result) => {
        if (result.length === 0) return res.status(401).json({ error: "Invalid credentials" });

        const user = result[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, username, skills: user.skills });
    });
});

// AUTH middleware
const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Access token missing" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = user;
        next();
    });
};

// POST JOB
app.post('/jobs', authenticateToken, (req, res) => {
    const { title, description, skills_required } = req.body;
    db.query(
        "INSERT INTO jobs (title, description, skills_required, user_id) VALUES (?, ?, ?, ?)",
        [title, description, skills_required, req.user.userId],
        (err, result) => {
            if (err) return res.status(500).json({ error: "DB error" });
            res.json({ id: result.insertId, title, description, skills_required });
        }
    );
});

// GET JOBS
app.get('/jobs', (req, res) => {
    db.query("SELECT j.*, u.username FROM jobs j JOIN users u ON j.user_id = u.id", (err, result) => {
        if (err) return res.status(500).json({ error: "DB error" });
        res.json(result);
    });
});

// APPLY JOB
app.post('/applications', authenticateToken, (req, res) => {
    const { job_id } = req.body;
    db.query(
        "INSERT INTO applications (job_id, user_id) VALUES (?, ?)",
        [job_id, req.user.userId],
        err => {
            if (err) return res.status(500).json({ error: "DB error" });
            res.json({ message: "Applied!" });
        }
    );
});

// AI RECOMMENDATIONS
app.get('/jobs/recommended', authenticateToken, async (req, res) => {
    db.query("SELECT skills FROM users WHERE id = ?", [req.user.userId], async (err, result) => {
        const userSkills = result[0].skills;
        db.query("SELECT id, skills_required FROM jobs", async (err, jobs) => {
            const response = await axios.post("http://localhost:5004/recommend", {
                user_skills: userSkills,
                jobs
            });

            const recommendedIds = response.data;
            db.query("SELECT * FROM jobs WHERE id IN (?)", [recommendedIds], (err, result) => {
                res.json(result);
            });
        });
    });
});

app.listen(port, () => console.log(`✅ Backend running http://localhost:${port}`));

