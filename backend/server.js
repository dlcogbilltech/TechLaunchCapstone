const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('./config/mongoose.config');
require('dotenv').config();

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

app.use( express.json(), express.urlencoded({ extended: true }) );
app.use(cors());

require('./routes/capstoneProject.routes')(app);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`The server is running on ${PORT}`);
});