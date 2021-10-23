// importing dependencies
const express = require('express');
const mongoose = require('mongoose');


// importing env
require('dotenv').config();


// variables
const port = process.env.PORT || 4000
const app = express();


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connecting database using async / await
const connectDB = async () => {
    try {
        await mongoose.connect( process.env.MONGO_DATABASE , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected!!');
    } catch (err) {
        console.log('Failed to connect to MongoDB', err);
    }
};

connectDB();


// ping route
app.get('/ping', (req, res)=>{
    return res.send(
        {
            error: false,
            message: "server is healthy",
        }
    )
});


// routes
const userRoutes = require('./src/routes/user.route');
app.use('/user', userRoutes);

// running server on port
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
});