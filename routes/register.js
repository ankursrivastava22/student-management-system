var express = require('express');
var router = express.Router();
const User= require('../models/User');
const bcrypt = require('bcryptjs');
var session = require('express-session')



/* GET home page. */
router.get('/register',  function(req, res, next) {
  var loginUser = localStorage.getItem('loginUser');
  if(req.session.userName){
    res.redirect('/dashboard');
  }
  else{
   res.render('register', { title: 'Express',msg:"" });
  }
}
);

const checkEmail = (req,res,next)=>{
  const email= req.body.email;
  const emailexists = User.findOne({email})
  emailexists.exec((err,data)=>{
    if(err) throw err
    if(data) {
      return res.render('register',{title:'sms',msg:'email exists'})

    }
    next()
  })
  }

  const checkAdmin = (req,res,next)=>{
    const secret_key= req.body.secret_key;
    if(secret_key!=="admin123")
    {
    return res.render('register',{title:'sms',msg:'plz contact admin for key'})
    } 
    next()
    }

  const checkUser = (req,res,next)=>{
    const username= req.body.username;
    const userexists = User.findOne({username})
    userexists.exec((err,data)=>{
      if(err) throw err
      if(data) {
        return res.render('register',{title:'sms',msg:'username exists'})
  
      }
      next()
    })
    }


router.post('/register',checkAdmin, checkEmail, checkUser, async function(req, res, next) {
  
  const {username,email,password,confirmpassword,secret_key}=req.body;

  if(password!==confirmpassword){
    return res.render('register',{title:'sms',msg:'password do not matches'})

  }
  else if(password.length<6)
  {
        return res.render('register',{title:'sms',msg:'password must contain 6 digits'})

  }  
 
  else {

  try{

      bcrypt.hash(password,12)
      .then(hashedpass=>{
        
        const userDetails= new User({
          username,
          email,
          password:hashedpass,
          secret_key
        })
    
      userDetails.save((err,doc)=>{
       if(err) throw err;
       res.render('register',{title:'sms',msg:'user registered successfully '})

     })
    
    })

    }
  
    catch(err){
       console.log(err.msg);
    }
  }
})

module.exports = router;
