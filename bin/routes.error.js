var createError = require('http-errors');

module.exports = function (app) {

	app.use(function (req, res) {
		res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
		res.status(404);
		res.render('404', { status: 404, title: 'Error 404' });
	})

	// error handler
	app.use(function(err, req, res, next) {
	  // set locals, only providing error in development
	  res.locals.message = err.message;
	  res.locals.error = req.app.get('env') === 'development' ? err : {};

	  // render the error page
	  res.status(err.status || 500);
	  res.render('error');
	});

	// error handler
	app.use(function (err, req, res, next) {
		if (err.code !== 'EBADCSRFTOKEN') return next(err)

		// handle CSRF token errors here
		res.status(403)
		res.send('Formulario con CSRFTOKEN incorrecto')
	})

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  next(createError(404));
	}); 

};