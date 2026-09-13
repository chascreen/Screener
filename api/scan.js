const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/scan', async (req, res) => {
  try {
    const response = await fetch('https://scanner.tradingview.com/crypto/scan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      throw new Error(`TradingView API Error: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Scan Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
