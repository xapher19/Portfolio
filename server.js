const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use('/public', express.static('public'));

app.listen(3000, () => console.log('Example app is listening on port 3000.'));