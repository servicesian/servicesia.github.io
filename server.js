const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

app.get('/ip', async (req, res) => {
  try {
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const ip = ipData.ip;
    
    const ipv6Response = await fetch(`https://api64.ipify.org?format=json&ipAddress=${ip}`);
    const ipv6Data = await ipv6Response.json();
    const ipv6 = ipv6Data.ip;
    
    const locationResponse = await fetch(`https://get.geojs.io/v1/ip/geo/${ip}.json`);
    const locationData = await locationResponse.json();
    const location = `${locationData.city}, ${locationData.region}, ${locationData.country}`;
    
    res.json({ ip, ipv6, location });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
