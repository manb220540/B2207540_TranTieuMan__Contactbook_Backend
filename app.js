const express = require('express');
const cors = require('cors');
const contactsRouter = require('./app/routes/contact.route');
const ApiError = require('./app/app-error');

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

// Middleware de xu ly loi 404
app.use((req, res, next) => {
    return next(new ApiError('Resource not found', 404));
    
});

// Middleware de xu ly loi chinh thuc
app.use((err, req, res, next) => { // Fixed 'reg' to 'req'
    return res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

app.get('/', (req, res) => {
    res.send('Welcome to the Contact Book Application!');
});



module.exports = app;