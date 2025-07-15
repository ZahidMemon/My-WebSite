const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root@123456$',
    database: 'formdb'
});

db.connect((err) => {
    if (err) throw err;
    console.log('connected to MySQL!');
});

app.post('/submit', (req, res) => {
    const { name, email, phone, address, age } = req.body;

    const sql = 'INSERT INTO contacts (name, email, phone, address, age ) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, email, phone, address, age ], (err, result) => {
        if (err) {
            console.error('insert error:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json({ message: 'Form submitted successfully!' });
    });
});

app.listen(port, () => {
    console.log('Server is running at http://localhost:${port}');
});
