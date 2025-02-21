// server.js
const express = require('express');
const path = require("path");
const app = express();
const { fetchEvents, fetchSchoolDates } = require('./serverside_js/fetch_content'); // Import functions

const PORT = 3000;

// Serve 'css', 'js', and 'assets' folders
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/assets', express.static('assets'));

// Serve 'html' as the root folder for your HTML files
app.use(express.static('html'));
app.use("/html", express.static(path.join(__dirname, "html")));

// Endpoint to fetch events dynamically
app.get('/api/events', async (req, res) => {
    try {
        const events = await fetchEvents(); // Use the imported function
        res.json(events);
    } catch (error) {
        console.error('Error in /api/events:', error); // More specific error logging
        res.status(500).send('Error fetching events');
    }
});

// Endpoint to fetch school dates
app.get('/api/schoolDates', async (req, res) => { // Corrected route definition
    try {
        const schoolDates = await fetchSchoolDates();
        res.json(schoolDates);
    } catch (error) {
        console.error('Error in /api/schoolDates:', error); // Corrected error message
        res.status(500).send('Error fetching school dates'); // Corrected error message
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});