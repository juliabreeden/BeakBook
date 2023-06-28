const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const signUpRouter = require('./models/routes/signUpRoute');
const loginRouter = require('./models/routes/loginRoute'); 
const createCardRouter = require('./models/routes/createCardRoute'); // Import the login route

const allowedOrigins = ['http://localhost:8080', 'http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST'], 
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

// Example API endpoint for fetching cards based on userId
// app.get('/api/cards', (req, res) => {
//   const _id = req.cookies.userId;

//   Card.find({ _id }, (err, cards) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Internal Server Error');
//     } else {
//       res.json(cards);
//     }
//   });
// });


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
