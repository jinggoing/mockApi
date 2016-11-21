# mockApi
结合mockjs 模拟数据的一个可以在本地模拟服务器并调试的 express api接口服务器



- 一个controller
``` 
var logger = require('../../config/log').logger;  
var Mock = require('mockjs');
var Random =Mock.Random;

module.exports = {
	test:function(req,res,next){
		console.log('test');		
		res.json({"success":false})
	},
	login:function(req,res,next){
		console.log('login');	
		var data = Mock.mock({    
		'token': Random.string( 15 )
		})	
		res.json(data);
	},
	userInfo:function(req,res,next){
		logger.info('user-info');
		console.log('user-info');
		var data = Mock.mock({    
			userId: Random.string( 15 ), 
			userName: Random.string( 'lower', 6, 8 ), 
			userType: 104, 
			questLevel: 1, 
			groups: ['aispeech']
		})		
		res.json({
			userId: Random.string( 'lower', 15,15 ), 
			userName: Random.cname(), 
			userType: 104, 
			questLevel: Random.natural( 1, 5 ), 
			groups: ['aispeech']
			})
	}
  //在这里添加你的接口数据
}
```
- 一个route
```
var qaController = require('../controllers/qa.controller');

module.exports = function (app) {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));	
	app.route('/test').post(qaController.test);
	app.route('/login').post(qaController.login);
	app.route('/user-info').get(qaController.userInfo);
  //在这里添加你的接口url
}
```
- 一个express服务
```
var log = require('./log');  
var logger = log.logger
var express = require('express');

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

```

搞定～
