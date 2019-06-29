//SET DEBUG=Incidencias:* & npm run devstart
const indexRouter = require('../routes/index');
/**
 * Express bcrypt for sometext
 */
const bcrypt = require('bcrypt-nodejs');
/*Config Options For Routes*/
const {auth} = require('../routes.json');
const {exclude} = require('../routes.json');

module.exports = function (app, passport) {

		/*Check Authentications*/
		app.use(function(req, res, next) {
			if(exclude.filter(e => e === req.url).length == 0)
			{
				let useBaseURL = '/' + req.url.split('/')[1];
				if(auth.filter(e => e === useBaseURL).length > 0)				
						if(!(req.isAuthenticated() && req.session))
							return res.render('./403', { status: 403, title: 'No autorizado' });  		
			}		
			next();              
		});

  	app.use('/', indexRouter);

	app.get('/google/callback', 
	  passport.authenticate('google', { failureRedirect: '/login' }),
	  function(req, res) {
			OnSeccesLogin(req, res)
	});
	
	app.post('/google', passport.authenticate('google', { scope: ['profile', 'email', 'openid'] }));
	
	app.get('/logout', function (req, res, next) {		
		//req.session = null;
		req.logout();		
		//delete req.isAuthenticated();
		res.redirect('/')
	});

	function OnSeccesLogin(req, res){
		//req.session.authenticated = true;
    	res.redirect('/dash');
	}
};