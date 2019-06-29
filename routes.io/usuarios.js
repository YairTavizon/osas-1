const Usuario = require('../models/Usuario');
const ObjectId = require('mongoose').Types.ObjectId; 

module.exports = function (app, io) {

	app.post('/tracking/rutaTrack', async (req, res) => {
		if(req.isAuthenticated()){
			try{
				var pos = {
					lat: req.body.lat,
					lng: req.body.lng
				  };
				await	Usuario.findOneAndUpdate(
					{_id: new ObjectId(req.user._id), provider: req.user.provider},
					{$set : {coordUsuario: pos}},
					{runValidators: true , new: true}
				)

				io.emit("rutaTrack", req.body);
				res.sendStatus(200);
			}
			catch (error){
				console.log('error',error);
				return res.sendStatus(500);
			}
		}
		else{
			res.sendStatus(304);
		}
	})

};