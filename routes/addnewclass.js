var express = require('express');
var router = express.Router();
var session = require('express-session')
var jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');



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

const checkClass = (req,res,next)=>{
  const classList= req.body.classList;
  const classexists = Class.findOne({classList})
  classexists.exec((err,data)=>{
    if(err) throw err
    if(data) {
      var loginUser = req.session.userName;
      return res.render('addnewclass', { title: 'Express',loginUser:loginUser,errors: '',success:'',msgg:'class already exists'});


    }
    next()
  })
  }

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

/* GET users listing. */
router.get('/addnewclass', checkLoginUser, function(req, res, next) {
  var loginUser = req.session.userName
    res.render('addnewclass', { title: 'Express',loginUser:loginUser,errors: '',success:'',msgg:''});
  });

  router.post('/addnewclass', checkClass,checkLoginUser,[check('classList','class name must be at least 3 chars long').isLength({ min: 3 })
  ], function(req, res, next) {
    var loginUser = req.session.userName
    const errors = validationResult(req);
     if (!errors.isEmpty()) {
      res.render('addnewclass', { title: 'Express',loginUser:loginUser, errors: errors.mapped(),success:'',msgg:''});
    }
    else{
      const {classList}=req.body;
      const classDetail = new Class({
        classList
      })
      classDetail.save((err,doc)=>{
        if(err) throw err;
        res.render('addnewclass',{title:'sms',loginUser:loginUser, errors:'',success:'successfully inserted',msgg:''})
      })
    
    }
  })

module.exports = router;
