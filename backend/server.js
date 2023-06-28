const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const signUpRouter = require('./models/routes/signUpRoute');
const loginRouter = require('./models/routes/loginRoute'); 
const createCardRouter = require('./models/routes/createCardRoute'); 
const Card = require('./models/cardModel');

const allowedOrigins = ['http://localhost:8080', 'http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type'], 
}));

app.use(express.json());
app.use(cookieParser());

// app.use(session({
//   secret: 'jG0qZ456969696969',
//   resave: true,
//   saveUninitialized: false,
//   cookie: {
//     secure: false
//   },
// }));

app.use(signUpRouter);
app.use(loginRouter); 
app.use(createCardRouter);


app.get('/cards', async (req, res) => {
  try {
    const userId = req.cookies.userId;
    const cards = await Card.find({ userId }).exec();
    res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Assuming you have an Express app instance defined as 'app'

app.put('/cards/:id', (req, res) => {
  const { id } = req.params;
  const updatedCard = req.body; // Assuming the updated card data is sent in the request body

  // Update the card in your database using the provided ID and updatedCard object

  // Example implementation using MongoDB and Mongoose
  // Assuming you have a Card model defined using Mongoose
  Card.findByIdAndUpdate(id, updatedCard, { new: true })
    .then((updatedCard) => {
      res.status(200).json(updatedCard);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to update the card.' });
    });
});

app.delete('/cards/:id', (req, res) => {
  const { id } = req.params
  Card.findByIdAndDelete(id)
    .then(() => {
      res.status(200)
      console.log('card deleted')
    })
    .catch((error) => {
      res.status(500).json({error: 'Failed to delete card.'})
    })
})


// app.use('/signup', signUpRouter);
// app.use('/login', loginRouter); 
// app.use('/createCard', createCardRouter);

app.get('/home', (req, res) => {

  res.send('home page ');
});

app.get('/test', (req, res) => {
  res.send('hello');
});

app.get('/test-cookie', (req, res) => {
  res.cookie('testCookie', 'testValue');
  res.send('Test cookie set!');
});

// mongoose.connect('mongodb+srv://juliabreeden1018:m0ng0dbtim3@cluster0.7k6qhck.mongodb.net/');

mongoose.connect('mongodb+srv://juliabreeden1018:m0ng0dbtim3@cluster0.7k6qhck.mongodb.net/')
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });


app.listen(3000, function () {
  console.log('express serving running on 3000');
});
