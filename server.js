const path = require('path');
const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const fs = require('fs');
const app = express();
const helmet = require('helmet');

// Middleware to set Cache-Control headers for all responses
app.use((req, res, next) => {
    res.set('Cache-Control', 'public, max-age=31557600');
    next();
});

// Define the Content Security Policy rules
const cspOptions = {
    directives: {
        defaultSrc: ["'self'"], // Allow resources from the same origin
        scriptSrc: ["'self'", 'blob:'], // Allow scripts only from the same origin
        styleSrc: ["'self'", "'unsafe-inline'", 'blob:'], // Allow styles only from the same origin and inline styles
        imgSrc: ["'self'", 'data:', 'blob:'], // Allow images from the same origin and data URIs
        connectSrc: ["'self'", 'http://localhost:*'], // Allow connections only to the same origin
        fontSrc: ["'self'"], // Allow fonts only from the same origin
        objectSrc: ["'none'"], // Disallow all object, embed, and applet sources
        frameSrc: ["'none'"], // Disallow all frame sources
        upgradeInsecureRequests: [], // Upgrade insecure requests to HTTPS
    },
};

// Use Helmet to set the CSP header
app.use(helmet.contentSecurityPolicy(cspOptions));

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
});

// Use public folder for static files with Brotli and gzip support
app.use(
    '/public',
    expressStaticGzip(path.join(__dirname, 'public'), {
        enableBrotli: true,
        orderPreference: ['br', 'gzip'],
        setHeaders: (res, path) => {
            if (path.endsWith('.br')) {
                res.setHeader('Content-Encoding', 'br');
                console.log(`Serving Brotli file: ${path}`);
            } else if (path.endsWith('.gz')) {
                res.setHeader('Content-Encoding', 'gzip');
                console.log(`Serving gzip file: ${path}`);
            } else {
                console.log(`Serving uncompressed file: ${path}`);
            }
        },
    })
);

// Serve the root index.html with compression
app.get('/', (req, res, next) => {
    const acceptEncoding = req.headers['accept-encoding'];
    const filePath = path.join(__dirname, 'public', 'index.html');
    if (acceptEncoding.includes('br') && fs.existsSync(filePath + '.br')) {
        res.setHeader('Content-Encoding', 'br');
        res.setHeader('Content-Type', 'text/html');
        res.sendFile(filePath + '.br');
        console.log(`Serving Brotli compressed index.html`);
    } else if (acceptEncoding.includes('gzip') && fs.existsSync(filePath + '.gz')) {
        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Content-Type', 'text/html');
        res.sendFile(filePath + '.gz');
        console.log(`Serving gzip compressed index.html`);
    } else {
        res.sendFile(filePath);
        console.log(`Serving uncompressed index.html`);
    }
});

// Open port
app.listen(8080, () => console.log('Example app is listening on port 8080.'));