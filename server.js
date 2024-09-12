const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;

// CORS ayarlarını yap
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// JSON verilerini işlemek için middleware
app.use(express.json());

// Statik dosyalar için middleware
app.use(express.static(path.join(__dirname, 'assets')));

// Kök rota
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'assets', 'html', 'index.html'));
});

// JSON dosyasını güncelleme endpoint'i
app.post('/update-data', (req, res) => {
    const jsonFilePath = path.join(__dirname, 'assets', 'json', 'veri.json');
    
    const newEntry = req.body; // Gelen tüm form verilerini al

    // JSON dosyasını güncelle
    fs.readFile(jsonFilePath, (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        let existingData = [];
        try {
            existingData = JSON.parse(data);
        } catch (e) {
            console.error('Error parsing JSON:', e);
        }

        // Yeni veriyi ekle
        existingData.push(newEntry);

        fs.writeFile(jsonFilePath, JSON.stringify(existingData, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(200).json({ message: 'Data updated successfully' });
        });
    });
});

// Domain verisini güncelleme endpoint'i
app.post('/update-domain', (req, res) => {
    const jsonFilePath = path.join(__dirname, 'assets', 'json', 'domain.json');
    
    const { domain } = req.body; // Gelen domain verisini al

    // JSON dosyasını güncelle
    fs.readFile(jsonFilePath, (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        let existingDomains = [];
        try {
            existingDomains = JSON.parse(data);
        } catch (e) {
            console.error('Error parsing JSON:', e);
        }

        // Yeni domain verisini ekle
        existingDomains.push({ domain });

        fs.writeFile(jsonFilePath, JSON.stringify(existingDomains, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(200).json({ message: 'Domain updated successfully' });
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});
