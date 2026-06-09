const mongoose = require('mongoose');
const capstoneProjectDB = "capstoneProjectDB";

mongoose.connect('mongodb://127.0.0.1:27017/capstoneProjectDB')
    .then(() => {
        console.log(`Connection established to MongoDB ${capstoneProjectDB}`);
    })
    .catch((err) => {
        console.log('DB CONNECTION ERROR', err);
    });