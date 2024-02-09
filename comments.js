// create web server

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'comments'
});

db.connect((err) => {
    if (err) {
        console.log('Error connecting to database');
    } else {
        console.log('Connected to database');
    }
});

app.get('/comments', (req, res) => {
    db.query('SELECT * FROM comments', (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }
    });
});

app.post('/comments', (req, res) => {
    const comment = req.body.comment;
    db.query('INSERT INTO comments (comment) VALUES (?)', [comment], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send('Values inserted');
        }
    });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});