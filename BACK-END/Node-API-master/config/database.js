const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const allowedOrigins = ['http://localhost:4200'];


exports.connect = () => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    mongoose.set("strictQuery", false)
    mongoose.
        connect('mongodb+srv://admin:admin@fiddod.xnchtzy.mongodb.net/?retryWrites=true&w=majority')
        .then(() => {
            console.log('connected to MongoDB')
            app.listen(3000, () => {
                console.log(`Node API app is running on port 3000`)
            });
        }).catch((error) => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
        })
}