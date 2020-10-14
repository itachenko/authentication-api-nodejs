require('dotenv').config();

const express = require('express')
const app = express();
const authRoute = require('./routes/auth');

app.use(express.json());

app.use('/api/user', authRoute);

app.listen(process.env.APP_PORT, () => console.log('App is running.'));
