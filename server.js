// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));

// Custom middleware 1
app.use((req, res, next) => {
    console.log('Custom Middleware 1');
    next();
});

// Custom middleware 2
app.use((req, res, next) => {
    console.log('Custom Middleware 2');
    next();
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// API endpoints
const apiUrl = 'https://jsonplaceholder.typicode.com';

// GET routes
app.get('/posts', async (req, res) => {
    try {
        const response = await axios.get(`${apiUrl}/posts`);
        res.json(response.data);
    } catch (error) {
        next(error);
    }
});

app.get('/users', async (req, res) => {
    try {
        const response = await axios.get(`${apiUrl}/users`);
        res.json(response.data);
    } catch (error) {
        next(error);
    }
});

// Render a view
app.get('/', (req, res) => {
    res.render('index', { title: 'Express Server App' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
