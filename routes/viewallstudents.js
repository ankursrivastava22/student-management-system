var express = require('express');
var router = express.Router();
const Class = require('../models/class');
const Student = require('../models/student');

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
router.get('/viewallstudents', checkLoginUser, function (req, res, next) {
  var loginUser = req.session.userName
  const getStudent = Student.find({});
  getStudent.exec(function (err, data) {
    if (err) throw err;
    res.render('viewallstudents', { title: 'sms', loginUser: loginUser, records: data });

  })
});

router.get('/viewallstudents/delete/:id', checkLoginUser, function (req, res, next) {
  var loginUser = req.session.userName
  var Student_id = req.params.id;
  const StudentDelete = Student.findByIdAndDelete(Student_id);
  StudentDelete.exec(function (err) {
    if (err) throw err;
    res.redirect('/viewallstudents');

  })
});
router.get('/viewallstudents/edit/:id', checkLoginUser, function (req, res, next) {
  var loginUser = req.session.userName
  var Student_id = req.params.id;
  var StudentEdit = Student.findById(Student_id);
  StudentEdit.exec(function (err, data) {
    if (err) throw err;
    res.render('editStudent', { title: 'sms', loginUser: loginUser, errors: '', msgg: '', success: '', records: data, id: Student_id });
  })
});


router.post('/viewallStudents/edit/', checkLoginUser, function (req, res, next) {
  var loginUser = req.session.userName
  var Student_id = req.body.id;
  const { classList, studentname, fathername, phone } = req.body;

  const StudentUpdate = Student.findByIdAndUpdate(Student_id, { classList, studentname, fathername, phone });
  StudentUpdate.exec(function (err, doc) {
    if (err) throw err;

    res.redirect('/viewallStudents');

  })
});




module.exports = router;
