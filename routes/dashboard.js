var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var session = require('express-session')

function checkLoginUser(req,res,next){
  var userToken=localStorage.getItem('userToken');
  try {
    if(req.session.userName){
    var decoded = jwt.verify(userToken, 'loginToken');
    }else
    {
      res.redirect('/'); 
    }
  } catch(err) {
    res.redirect('/');
  }
  next();
} 

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

/* GET home page. */
router.get('/dashboard',checkLoginUser, function(req, res) {
  var loginUser = req.session.userName
  res.render('dashboard', { title: 'sms',loginUser:loginUser, msg:"" });
});

module.exports = router; 
 