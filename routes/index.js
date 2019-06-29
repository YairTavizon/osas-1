var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated())    
    res.redirect("/dash")
  else
    res.render('index', { 
      title: 'Inicio', 
      csrfToken: req.csrfToken(), 
      content: 'index'
    });
});

router.get('/burbujas', function(req, res, next) {
  res.render('index', { 
    title: 'Burbujas', 
    csrfToken: req.csrfToken(), 
    content: 'burbujas'
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

router.get('/eventos', function(req, res, next) {
  res.render('index', { 
    title: 'Eventos', 
    csrfToken: req.csrfToken(), 
    content: 'eventos'
  });
});

router.get('/ruta', function(req, res, next) {
  res.render('index', { 
    title: 'Ruta', 
    csrfToken: req.csrfToken(), 
    content: 'ruta'
  });
});

router.get('/ruta/share', function(req, res, next) {
  const baseUrl = "http"+(req.headers.host == "localhost:3000" ? "" : "s")+"://" +req.headers.host;
  res.render('index', { 
    title: 'Seguimiento', 
    csrfToken: req.csrfToken(), 
    content: 'tracking',
    baseUrl: baseUrl,
    user: req.user,
    api_key: process.env.GOOGLE_MAPS_API_KEY
  });
});

module.exports = router;
