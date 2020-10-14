require('dotenv').config();

const express = require('express')
const mongo = require('mongoose');
const app = express();
const authRoute = require('./routes/auth');

app.use(express.json());

app.use('/api/user', authRoute);

mongo.connect(process.env.MONGODB_CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connection with the database has been established'))
    .catch((error) => console.log(`Could not establish connection. \nReason: ${error.message}`));

app.listen(process.env.APP_PORT, () => console.log('App is running.'));
