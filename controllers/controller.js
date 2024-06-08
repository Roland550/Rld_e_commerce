const express =require('express')
const user = require('../models/models')
const session = require('express-session');
const app = express();

// use the session middleware to store the session data
app.use(session({
    secret: 'some secret', // change this to a secure value
    resave: false,
    saveUninitialized: false
  }));
  


//register part

const Register = async(req, res)=>{
    const {name, email, phone, address, password}= req.body


    if(!name|| !email || !phone || password){
        res.send('Fill all the required input')
    }else{
       res.render('login') 
    }

    let data = new user({
        name: name.req.body,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPass
    })
   
   try {
     await data.save()
   } catch (error) {
    console.log(error);
   }

   if(!data){
     
    return res.status(400).json({
     message: 'Invalid user Data'
   })
   }else{
     // res.sendFile(path.join(staticPath, "login.html"));
     res.render('login')
   }
}






module.exports={
    Register
}