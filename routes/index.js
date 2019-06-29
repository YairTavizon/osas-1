var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Inicio', 
    csrfToken: req.csrfToken(), 
    content: 'index'
  });
});

router.get('/login', function(req, res, next) {
  res.render('index', { 
    title: 'Login', 
    csrfToken: req.csrfToken(), 
    content: 'login'
  });
});

router.get('/dash', function(req, res, next) {
  res.render('index', { 
    title: 'Dash', 
    csrfToken: req.csrfToken(), 
    content: 'dash'
  });
});

module.exports = router;
