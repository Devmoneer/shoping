// Example Node.js/Express backend (pseudo-code)
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');

app.use(bodyParser.json());
const upload = multer({ dest: 'uploads/' });

let laptops = [];

// Get all laptops
app.get('/api/laptops', (req, res) => {
    res.json(laptops);
});

// Add new laptop
app.post('/api/laptops', upload.single('image'), (req, res) => {
    const newLaptop = {
        id: Date.now(),
        ...req.body,
        imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
        addedBy: req.body.userEmail,
        dateAdded: new Date().toISOString()
    };
    laptops.unshift(newLaptop);
    res.status(201).json(newLaptop);
});

app.listen(3000, () => console.log('Server running on port 3000'));