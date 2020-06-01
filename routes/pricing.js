var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/pricing', function(req, res, next) {
    res.render('pricing', { title: 'Express',msg:"" });
  });

module.exports = router;
