var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/logout', function(req, res, next) {

  req.session.destroy(function(err) {
   if(err){
    res.redirect('/')
   }
  })
  localStorage.removeItem('userToken')
  localStorage.removeItem('loginUser')
  res.redirect('/')
  });
module.exports = router;
 