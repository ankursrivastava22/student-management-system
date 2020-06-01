var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/blog', function(req, res, next) {
    res.render('blog', { title: 'Express',msg:"" });
  });

module.exports = router;
