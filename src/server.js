const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');


app.use(cors({
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.options('/api/auth/connect/token', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(200);
});

app.post('/api/auth/connect/token', async (req, res) => {
    const body = new URLSearchParams({
        client_id: req.body.client_id,
        client_secret: req.body.client_secret,
        grant_type: req.body.grant_type
    }).toString();
    console.log('Request body:', body);


    try {
        const response = await axios.post('https://api.starlink.com/auth/connect/token', body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { message: 'Server error' });
    }
});

app.get('/api/enterprise/v1/accounts', async (req, res) => {
    const token = req.headers['authorization'];

    try {
      const response = await axios.get('https://web-api.starlink.com/enterprise/v1/accounts', {
        headers: {
          'Authorization': token, // Ensure 'Authorization' is correct
          'Content-Type': 'application/json'
        }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { message: 'Server error' });
    }
});
app.get('/api/enterprise/v1/account/accountnumber/service-lines/available-products', async (req, res) => {
    const token = req.headers['authorization'];

    try {
      const response = await axios.get('https://web-api.starlink.com/enterprise/v1/account/ACC-3456480-85383-22/service-lines/available-products', {
        headers: {
          'Authorization': token, // Ensure 'Authorization' is correct
          'Content-Type': 'application/json'
        }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { message: 'Server error' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});