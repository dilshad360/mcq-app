const express = require('express');
const { default: connectDB } = require('./config/db');
const app = express();

connectDB();

// Define a basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
