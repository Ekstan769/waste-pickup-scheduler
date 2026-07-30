require('dotenv').config();
const express = require('express');
const pickupsRouter = require('./routes/pickups');
const authRouter = require('./routes/auth');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/pickups', pickupsRouter);

app.listen(3000, () => console.log('Server running on port 3000'));