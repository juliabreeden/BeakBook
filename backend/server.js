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
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require("openai");

const allowedOrigins = ['http://localhost:8080', 'http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type'], 
}));

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// app.use(session({
//   secret: 'jG0qZ456969696969',
//   resave: true,
//   saveUninitialized: false,
//   cookie: {
//     secure: false
//   },
// }));
app.use(express.static(__dirname + '/src'));
app.use(signUpRouter);
app.use(loginRouter); 
app.use(createCardRouter);

app.post("/chat", async (req, res) => {
  // Get the prompt from the request
  const { prompt } = req.body;

  console.log(req.body);

  // Generate a response with ChatGPT
  const completion = await openai.createCompletion({
  model: "text-davinci-002",
  // model: 'gpt-3.5-turbo',
  // prompt: 'I need help identifying the species of a bird I saw. In your response, please do not include any sentences or words other than naming the birds. Do not say anything besides listing 1-4 possible species you think my card could be. Please pay special attention to the size and color of the bird when making your suggestions, and be as accurate as possible. Please do not just say random finches. Base your answer off of this bird information: Bird info is:' + prompt,
  prompt: 'Please respond with 1-4 possible species of birds I saw based on the information I will provide. In your response, do not include any words besides the possible bird species. Please pay careful attention to the location the bird was spotted in, as well as the size of the bird, when making your predictions. Please also pay close attention to what the bird was spotting doing. For example, if the bird was swimming or wading, that is likely a bird that often lives near bodies of water or is seen at beaches or lakes. Please note that the size property is just meant to be a comparison based on common birds to compare sizes to, and the name of the bird used for the size property does not mean it was actually that bird that was spotted. Please be as accurate as possible. For example, if the size property is listed as a crow or larger, do not name any type of finch as a possible species, as that is not in accordance with the size characteristic. Use every piece of bird info given to make your predictions. Here is the bird info:' + prompt, 
  max_tokens: 60, // increased to give more room for varied answers
  n: 1,
  stop: null,
  temperature: 0.4, // lowered a bit to make output more deterministic
  top_p: 1, // nucleus sampling parameter for more diverse outputs
  frequency_penalty: 0.5, // penalize frequently occuring outputs
  presence_penalty: 0.5, // penalize new
  });
  console.log(completion.data.choices[0].text);
  res.send(completion.data.choices[0].text);
});


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



app.put('/cards/:id', (req, res) => {
  const { id } = req.params;
  const updatedCard = req.body; // Assuming the updated card data is sent in the request body

 
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

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });


app.listen(3000, function () {
  console.log('express serving running on 3000');
});
