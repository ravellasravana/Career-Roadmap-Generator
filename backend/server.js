// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Change this to your MySQL username
    password: 'root', // Change this to your MySQL password
    database: 'career_roadmap' // Make sure this database exists
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// User authentication (for demo purposes)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Validate credentials (hardcoded for demo)
    if (username === 'user' && password === 'pass') {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Generate roadmap based on designation
app.post('/generate', (req, res) => {
    const { salaryRange, designation, company } = req.body;

    // Query the database for the roadmap based on designation
    const sql = 'SELECT steps, codingSkills, internships, interviewTopics, projectTopics, interviewRounds FROM roadmaps WHERE designation = ? AND salaryRange = ? AND company = ?';
    db.query(sql, [designation, salaryRange, company], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ message: 'Internal Server Error' });
            return; 
        }

        if (result.length > 0) {
            const roadmap = {
                salaryRange,
                designation,
                company,
                steps: JSON.parse(result[0].steps), // Parse the JSON steps
                codingSkills: JSON.parse(result[0].codingSkills),
                internships: JSON.parse(result[0].internships),
                interviewTopics: JSON.parse(result[0].interviewTopics),
                projectTopics: JSON.parse(result[0].projectTopics),
                interviewRounds: result[0].interviewRounds
            };
            res.json(roadmap);
        } else {
            res.status(404).json({ message: 'No roadmap found for the given criteria.' });
        }
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});