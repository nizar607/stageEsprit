const express = require('express')
const mongoose = require('mongoose')
const Offer = require('./models/offerModel')
const app = express()
const cors = require('cors');

const allowedOrigins = ['http://localhost:4200'];
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Devtamin')
})

app.get('/offers', async(req, res) => {
    try {
        const offers = await Offer.find({});
        res.status(200).json(offers);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/offers/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const offer = await Offer.findById(id);
        res.status(200).json(offer);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post('/offers', async(req, res) => {
    console.log(req.body);
    try {
        const offer = await Offer.create(req.body)
        res.status(200).json(offer);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a offer
app.put('/offers/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const offer = await Offer.findByIdAndUpdate(id, req.body);
        // we cannot find any offer in database
        if(!offer){
            return res.status(404).json({message: `cannot find any offer with ID ${id}`})
        }
        const updatedoffer = await offer.findById(id);
        res.status(200).json(updatedoffer);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a offer

app.delete('/offers/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const offer = await Offer.findByIdAndDelete(id);
        if(!offer){
            return res.status(404).json({message: `cannot find any offer with ID ${id}`})
        }
        res.status(200).json(offer);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://admin:admin@fiddod.xnchtzy.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})