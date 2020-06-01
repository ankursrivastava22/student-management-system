var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/course-grid-4', function(req, res, next) {
    res.render('course-grid-4', { title: 'Express',msg:"" });
  });

module.exports = router;
