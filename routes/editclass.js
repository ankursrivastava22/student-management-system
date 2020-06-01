var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/editclass', function(req, res, next) {
    res.render('editclass', { title: 'Express',msg:"" });
  });

module.exports = router;
