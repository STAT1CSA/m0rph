const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const signupRouter = require('./users/signup');
const verifyRouter = require('./users/verify');
const loginRouter = require('./users/login');
const app = express();

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://haydenweis:haydenweis123@cluster0.x86lfeu.mongodb.net/', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.error(err);
    });
// Define routes
app.use('/users/signup', signupRouter);
app.use('/users/verify', verifyRouter);
app.use('/users/login', loginRouter);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));