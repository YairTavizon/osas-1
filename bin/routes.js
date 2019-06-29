//SET DEBUG=Incidencias:* & npm run devstart
const indexRouter = require('../routes/index');
/**
 * Express bcrypt for sometext
 */
const bcrypt = require('bcrypt-nodejs');

module.exports = function (app) {

  	app.use('/', indexRouter);

};