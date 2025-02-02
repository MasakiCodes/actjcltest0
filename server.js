const express = require('express');
const path = require("path");

const app = express();
const fetchContent = require('./serverside_js/fetch_content'); // Import the script

const PORT = 3000;

// Serve 'css', 'js', and 'assets' folders
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/assets', express.static('assets'));

// Serve 'html' as the root folder for your HTML files
app.use(express.static('html'));
app.use("/html", express.static(path.join(__dirname, "html")));


// Endpoint to fetch content dynamically
app.get('/api/events', async (req, res) => {
  try {
    const events = await fetchContent('events');
    res.json(events);
  } catch (error) {
    res.status(500).send('Error fetching content');
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});