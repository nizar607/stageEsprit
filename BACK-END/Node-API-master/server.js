require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose')
const Offer = require('./models/offerModel')
const User = require("./models/user");
const Candidature = require("./models/candidature");
const app = express();
const cors = require('cors');
const multer = require('multer');
const PDFParser = require('pdf-parse');
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require("./config/database");
const path = require('path');
const UserProfile = require("./models/userProfile");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../../FRONT-END/newApp/src/uploads/'); // Set the destination directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname); // Get the file extension
        const fileName = uniqueSuffix + fileExtension;
        cb(null, fileName); // Set the file name
    }
});

const upload = multer({ storage: storage });







const allowedOrigins = ['http://localhost:4200'];
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: false }))




app.post('/resume', upload.single('resume'), (req, res) => {
    try {
        const file = req.file;
        console.log(file);
        if (!file) {
            return res.status(400).json({ error: 'Resume file is required' });
        }

        res.json({ resume: file.filename });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post("/candidature", async (req, res) => {
    try {
        const { userId, companyId, email, phoneNumber, resume } = req.body;

        if (!email || !phoneNumber || !resume || !userId || !companyId) {
            return res.status(400).json({ error: "All input is required" });
        }

        const candidature = await Candidature.create({
            userId,
            companyId,
            email,
            phoneNumber,
            resume
        });

        return res.status(200).json(candidature);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Register
app.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, type, email, password, phoneNumber, companyName } = req.body;

        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ error: "All input is required" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ error: "User Already Exists. Please Login" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            type,
            email: email.toLowerCase(),
            password: hashedPassword,
            phoneNumber,
            companyName,
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_SECRET, // Rename TOKEN_KEY to TOKEN_SECRET
            { expiresIn: "2h" }
        );

        user.token = token;
        await user.save();

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




// Login
app.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password) {
            return res.status(400).json({ error: "All input is required" });
        }

        const user = await User.findOne({ email });
        console.log(user);

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_SECRET,
                { expiresIn: "2h" }
            );

            user.token = token;
            await user.save();
            console.log("user found");
            res.status(200).json(user);
        } else {
            res.status(400).json({ error: "Invalid Credentials" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//get users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


app.post('/token', async (req, res) => {
    try {
        const jwt = require('jsonwebtoken');

        // Your JWT token
        const token = req.body.token;

        // Your JWT secret or public key (if applicable)
        const secretOrPublicKey = 'mysecretkey';

        try {
            // Verify and decode the token
            const decodedToken = jwt.verify(token, secretOrPublicKey);

            // Check the token's expiration
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            if (decodedToken.exp && decodedToken.exp > currentTime) {
                console.log('Token is still valid.');
                res.status(200).json({ valid: true });
            } else {
                console.log('Token has expired.');
            }
        } catch (error) {
            res.status(500).json({ valid: false });
        }

    } catch (error) {
        res.status(500).json({ valid: false })
    }
});



//search offer
app.post('/offers/search', async (req, res) => {
    const { title, location } = req.body;
    console.log(title, location);
    if (title == undefined)
        title = "";
    if (location == undefined)
        location = "";

    try {
        // Perform a MongoDB query to find matching jobs
        const offers = await Offer.find({
            $or: [
                { title: { $regex: title, $options: 'i' } }, // Case-insensitive title search
                { location: { $regex: location, $options: 'i' } }, // Case-insensitive location search
            ],
        });
        console.log(offers);
        res.json(offers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Devtamin')
})

app.get('/offers', async (req, res) => {
    try {
        const offers = await Offer.find({});
        res.status(200).json(offers);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/offers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const offer = await Offer.findById(id);
        res.status(200).json(offer);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


app.post('/offers', async (req, res) => {
    console.log(req.body);
    try {
        const offer = await Offer.create(req.body)
        res.status(200).json(offer);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

// update a offer
app.put('/offers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const offer = await Offer.findByIdAndUpdate(id, req.body);
        // we cannot find any offer in database
        if (!offer) {
            return res.status(404).json({ message: `cannot find any offer with ID ${id}` })
        }
        const updatedoffer = await offer.findById(id);
        res.status(200).json(updatedoffer);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// delete a offer

app.delete('/offers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const offer = await Offer.findByIdAndDelete(id);
        if (!offer) {
            return res.status(404).json({ message: `cannot find any offer with ID ${id}` })
        }
        res.status(200).json(offer);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post('/upload', upload.single('resume'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const pdfData = req.file.buffer; // File buffer from multer

    try {
        const data = await PDFParser(pdfData);
        const extractedText = data.text; // Extracted text from PDF

        const options = {
            method: 'POST',
            url: 'https://chatgpt-gpt4-ai-chatbot.p.rapidapi.com/ask',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'c02912c64amsh98b79271f633632p1dd529jsnf67070343090',
                'X-RapidAPI-Host': 'chatgpt-gpt4-ai-chatbot.p.rapidapi.com'
            },
            data: {
                query: `this is a resume transform it into a json like this: {
            "firstName": "",
            "lastName": "",
            "email": "",
            "phone": "",
            "streetAddress": "",
            "postalCode": "",
            "city": ""
          } ` + extractedText
            }
        };

        const response = await axios.request(options);
        console.log(response.data);

        res.json({ extractedText, aiResponse: response.data });
    } catch (error) {
        console.error('Error while parsing PDF or making API request:', error);
        res.status(500).send('Error processing PDF or making API request.');
    }
});


// user PROFILE
app.get('/userProfile', async (req, res) => {
    try {
        const userProfiles = await UserProfile.find({});
        res.status(200).json(userProfiles);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/userProfile/:id', async (req, res) => {
    try {
        const { userId } = req.params;
        const userProfile = await UserProfile.findOne({userId});
        res.status(200).json(userProfile);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


app.post('/userProfile', async (req, res) => {
    console.log(req.body);
    try {
        const userProfile = await UserProfile.create(req.body)
        res.status(200).json(userProfile);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

// update a offer
app.put('/userProfile/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userProfile = await UserProfile.findByIdAndUpdate(id, req.body);
        // we cannot find any offer in database
        if (!offer) {
            return res.status(404).json({ message: `cannot find any offer with ID ${id}` })
        }
        const updateUserProfile = await UserProfile.findById(id);
        res.status(200).json(updateUserProfile);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// delete a offer

app.delete('/userProfile/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userProfile = await UserProfile.findByIdAndDelete(id);
        if (!userProfile) {
            return res.status(404).json({ message: `cannot find any offer with ID ${id}` })
        }
        res.status(200).json(userProfile);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

mongoose.set("strictQuery", false)
mongoose.
    connect('mongodb+srv://admin:admin@fiddod.xnchtzy.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('connected to MongoDB')
        app.listen(3000, () => {
            console.log(`Node API app is running on port 3000`)
        });
    }).catch((error) => {
        console.log(error)
    })





























