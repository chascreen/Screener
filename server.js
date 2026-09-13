const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.')); //Melayani file html statis

app.post('/api/scan', async (req, res) => {
    try {
        const response = await fetch("https://scanner.tradingview.com/crypto/scan", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozzila/5.0 (Windows NT 10.0; Win64; x64)"
            },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.json(data);        
    } catch(error) {
        res.status(500).json({ error: error.message});
    };   
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
        console.log("Server Screener berjalan di port ${PORT}");
});
