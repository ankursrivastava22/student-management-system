var express = require('express');
var router = express.Router();
const Class = require('../models/class');

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
/* GET users listing. */
router.get('/viewallclasses', checkLoginUser, function (req, res, next) {
  var loginUser = req.session.userName
  const getClass = Class.find({});
  getClass.exec(function (err, data) {
    if (err) throw err;
    res.render('viewallclasses', { title: 'sms', loginUser: loginUser, records: data });

  })
});

router.get('/viewallclasses/delete/:id', checkLoginUser, function (req, res, next) {
  var loginUser = req.session.userName
  var class_id = req.params.id;
  const classDelete = Class.findByIdAndDelete(class_id);
  classDelete.exec(function (err) {
    if (err) throw err;
    res.redirect('/viewallclasses');

  })
});
router.get('/viewallclasses/edit/:id', checkLoginUser, function (req, res, next) {
  var loginUser = req.session.userName
  var class_id = req.params.id;
  var classEdit = Class.findById(class_id);
  classEdit.exec(function (err, data) {
    if (err) throw err;
    
    res.render('editclass', { title: 'sms', loginUser: loginUser, errors: '', msgg: '', success: '', records: data, id: class_id });

  })
});


router.post('/viewallclasses/edit/', checkLoginUser, function (req, res, next) {
  var loginUser = localStorage.getItem('loginUser');
  var class_id = req.body.id;
  var classList = req.body.classList;
  const classUpdate = Class.findByIdAndUpdate(class_id, { classList: classList });
  classUpdate.exec(function (err, doc) {
    if (err) throw err;

    res.redirect('/viewallclasses');

  })
});




module.exports = router;
