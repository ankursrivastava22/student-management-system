var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/blog-single', function(req, res, next) {
    res.render('blog-single', { title: 'Express',msg:"" });
  });

module.exports = router;
