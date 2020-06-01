var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/teachers', function(req, res, next) {
    res.render('teachers', { title: 'Express',msg:"" });
  });

module.exports = router;
