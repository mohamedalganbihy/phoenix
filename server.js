
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

const DATA_FILE = path.join(__dirname, 'devices.json');

app.get('/devices', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).json([]);
        res.json(JSON.parse(data || '[]'));
    });
});

app.post('/devices', (req, res) => {
    const newDevice = req.body;
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        let devices = [];
        if (!err && data) devices = JSON.parse(data);
        devices.push(newDevice);
        fs.writeFile(DATA_FILE, JSON.stringify(devices, null, 2), () => {
            res.json({ message: 'تم الحفظ' });
        });
    });
});

app.put('/devices', (req, res) => {
    const devices = req.body;
    fs.writeFile(DATA_FILE, JSON.stringify(devices, null, 2), () => {
        res.json({ message: 'تم التحديث' });
    });
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
