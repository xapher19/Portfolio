// Set consts
const express = require('express');
const path = require('path');
const app = express();

// Direct root domain to index html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Use Cache-Control
/* app.use((req, res, next) => {
    res.set('Cache-Control', 'public, max-age=31557600');
    next();
});*/

// Use public folder for static files
app.use('/public', express.static('public'));

// Open port
app.listen(8080, () => console.log('Example app is listening on port 8080.'));