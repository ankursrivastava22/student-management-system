var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'Express',msg:"" });
  });

module.exports = router;
