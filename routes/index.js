var express = require('express');
var router = express.Router();
const User= require('../models/User');
const bcrypt = require('bcryptjs'); 
var jwt = require('jsonwebtoken');
var session = require('express-session')

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

const checkAdmin = (req,res,next)=>{
  const secret_key= req.body.secret_key;
  if(secret_key!=="admin123")
  {
  return res.render('index',{title:'sms',msg:'plz contact admin for key'})
  } 
  next()
  }

/* GET home page. */
router.get('/', function(req, res, next) {
  var loginUser = localStorage.getItem('loginUser');
if(req.session.userName){
  res.redirect('/dashboard');
}
else{
 res.render('index', { title: 'Express',loginUser: loginUser,msg:"" });
}
});
 
router.post('/', checkAdmin, function(req, res, next) {
  const {username,password}=req.body;
  User.findOne({username})
  .then(savedUser=>{
    if(!savedUser){
      return res.render('index',{title:'sms',msg:'username does not exists'})
    }
    var getUserId=savedUser._id
    bcrypt.compare(password,savedUser.password)
    .then(domatch=>{
      if(domatch){
        var token = jwt.sign({ userID:getUserId },'loginToken');
        localStorage.setItem('userToken', token)
        localStorage.setItem('loginUser', username)
        req.session.userName= username;
       res.redirect('/dashboard')
      }
      else{
        return res.render('index',{title:'sms',msg:'username password does not match'})
      }
    })
  })

});

module.exports = router;
