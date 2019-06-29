module.exports = function (app, io) {

	/*GET MESSAGE*/
	app.get('/messages', (req, res) => {
	  Message.find({},(err, messages)=> {
	  	if(err)
	      res.send(err);
	    res.send(messages);
	  })
	});

	/*GET MESSAGE BY USER*/
	app.get('/messages/:user', (req, res) => {
	  var user = req.params.user;
	  Message.find({name: user},(err, messages)=> {
	    res.send(messages);
	  })
	})


	/*Socket IO Incomming Data*/
	app.post('/messages', async (req, res) => {
	  try{
	    var message = new Message(req.body);

	    var savedMessage = await message.save()
	      console.log('saved');

	    var censored = await Message.findOne({message:'badword'});
	      if(censored)
	        await Message.remove({_id: censored.id})
	      else
	        io.emit('message', req.body);
	      res.sendStatus(200);
	  }
	  catch (error){
	    res.sendStatus(500);
	    return console.log('error',error);
	  }
	  finally{
	    console.log('Message Posted')
	  }
	})
};