var express = require('express');
var router = express.Router();
const Class = require('../models/class');
const Student = require('../models/student');
var session = require('express-session')

var jwt = require('jsonwebtoken');

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

/* GET users listing. */
router.get('/addnewstudent',checkLoginUser,  function(req, res, next) {
 
  var loginUser = req.session.userName
  const getClass = Class.find({});
  getClass.exec(function (err, data) {
    if (err) throw err;
    res.render('addnewstudent', { title: 'Express',loginUser:loginUser,records: data, success:"" });
  })
  });


  router.post('/addnewstudent',checkLoginUser,  function(req, res, next) {
 
    var loginUser = req.session.userName
    const {classList,studentname,fathername,phone}=req.body;
    const studentDetails= new Student({
      classList,
      studentname,
      fathername,
      phone
    })

  studentDetails.save((err,data)=>{
   if(err) throw err;
   res.render('addnewstudent', { title: 'Express',loginUser:loginUser,records: data, success:"record inserted successfully" });

    })
    });

module.exports = router;
