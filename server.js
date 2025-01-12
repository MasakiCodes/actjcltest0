const express = require('express');
const app = express();
const PORT = 3000;

// Serve 'css', 'js', and 'assets' folders
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/assets', express.static('assets'));

// Serve 'html' as the root folder for your HTML files
app.use(express.static('html'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});