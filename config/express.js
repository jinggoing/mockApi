var log = require('./log');  
var logger = log.logger
var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(){
	logger.info("app start");
	
	var app = express();
	log.use(app);
		//引入路由文件
	app.use(express.static('./src'));
	app.set('views', __dirname + '/src');
	require('../app/routers/qa.route')(app);
//404 处理
	app.use(function(req ,res, next){
		res.status(404);
		try{
			return res.json('Not Found');
		}catch(e){
			console.error('404 set header after sent');
		}
	});
	
	//其他错误处理
	app.use(function(err, req, res, next){
		res.status(500);
		
		if(!err){
			return next();
		}
		try{
			return res.json(err.message || 'server error');
		}catch(e){
			console.log('500 set header after sent');
		}
	});
	
	var server = app.listen(3001, function () {
  		var host = server.address().address;
  		var port = server.address().port;
		console.log('app listening at ', port);
  		logger.info('app listening at ', port);
	});
	
	return app;
}