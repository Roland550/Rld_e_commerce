// server.js
// import the required modules
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose  = require('mongoose');
const authRoutes = require('./routes/auth');
const userRoute = require('./routes/userRoutes');
const { Register } = require('./controllers/controller');
const User = require('./models/models');
const bcrypt = require('bcrypt')


//aws config

// const aws = require('aws-sdk');
// const dotenv = require('dotenv');
// dotenv.config();

//aws parameters




//const ejs = require('ejs');
//calling models


// create an express app
const app = express();


let staticPath = path.join(__dirname, 'public')


// use the body-parser middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(staticPath));


// define a route for the main page
app.get('/', (req, res) => {
  // get the username from the session
  
  // render the main.html page with the username
 res.sendFile(path.join(staticPath, 'index.html'));
     
});

//define A ROUTE FOR register

app.post('/signup', async(req,res)=>{
  const { name, email, password } = req.body;
  
   // Validation
   if(!req.body.name || !req.body.password || !req.body.email){
     return res.status(400).json({
       message: 'Please fill out all fields'
     })
   }
    if(req.body.password.length < 5){
     return res.status(400).json({
       message: 'password must be 5 long'
     })
    }
     
    //check if user email already exist
    const userExist = await User.findOne({email})
 
    if(userExist){
     return res.status(400).json({
       message: 'Email has already been registered Try another email'
     })
    }
 
  
 
    //Encrypt the password befor saving to DB
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
 
    //Create new user
    const user = new User({
         name: name,
         email: email,
         password: hashedPassword
    })
        try{
         await user.save()
         console.log('Form data saved to mongodb');
         
        }catch(error){
         console.log(error);
        }
   
      //function generate token
      //  const token = generateToken(user._id);
      //  // Extract the user's information from the decoded token
      //    const userId = decodedToken._id;
      //    const username = decodedToken.text;
      //    // Get the user's information from the database
      //       const user1 = await User.findById(userId);

      //       // Send the user's information as a response
      //       res.json({ text: user1.text });
 
      //send HTTP-only cookie
      // res.cookie("token", token, {
      //  path:"/",
      //  httpOnly: true,
      //  expires: new Date(Date.now() + 1000*86400), // one day
      //  sameSite: "none",
      //  secure: true
      // })
    if(!user){
     
     return res.status(400).json({
      message: 'Invalid user Data'
    })
    }else{
      // res.sendFile(path.join(staticPath, "login.html"));
      res.sendFile(path.join(staticPath, 'login.html'));
    }
})



// define a route for the login action
app.post('/login', async(req, res) => {
  // get the username and password from the request body
  
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email
  // validate the username and password
  // this is just a simple example, you should use a proper authentication method
  if (!name ||!password ) {
    // send an error message
    res.send('Invalid username or password');
    
   
  } else {
    // set the username in the session
    // req.session.name = name;
    // redirect to the main page
    res.redirect('/');
  }
  //check if user exist
  const user = await User.findOne({email})
  if(!user){
    res.status(400).json({
      message: 'User not found, Please signup'
    })
  }

});



// define a route for the logout action
app.get('/logout', (req, res) => {
  // destroy the session
  req.session.destroy();
  // redirect to the main page
  res.redirect('/');
});


// define a route for the login page
app.get('/login', (req, res) => {
  // render the login.html page
  res.sendFile(path.join(staticPath, 'login.html'));
});

// define a route for the login page
app.get('/signup', (req, res) => {
  // render the login.html page
  res.sendFile(path.join(staticPath, 'signup.html'));
});

//product routes
app.get('/product', (req,res)=>{
    res.sendFile(path.join(staticPath, 'product.html'));
})
//product routes
app.get('/seller', (req,res)=>{
    res.sendFile(path.join(staticPath, 'seller.html'));
})
// define a route for the addProduct page
app.get('/addProduct', (req, res) => {
  // render the login.html page
  res.sendFile(path.join(staticPath, 'addProduct.html'));
});
//links together

// app.get('/Homes', (req,res)=>{
//   res.render('Homes', {title: 'testing page'} )
// })
// app.get('/add', (req,res)=>{
//   res.render('add_users', {title: 'Add-users'} )
// })

//search routes
app.get('/search', (req,res)=>{
    res.sendFile(path.join(staticPath, 'search.html'));
})
//404 route
app.get('/404',(req,res)=>{
    res.sendFile(path.join(staticPath, '404.html'));
})
app.use((req,res)=>{
    res.sendFile(path.join(staticPath, '404.html'));
})
app.use('/signup', userRoute)

//connecting database
mongoose.connect("mongodb://0.0.0.0:27017/E-commerce", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
  const db = mongoose.connection
db.on("error", (err)=>{ 
    console.log(err);
})

db.once("open", ()=>{
    console.log("Database Connected!");
})

app.use('/api/auth', authRoutes);

// start the server on port 3000
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

app.use('/signup', userRoute)

