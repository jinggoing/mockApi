var http = require('http');
var request = require('request');
var querystring = require('querystring');
var urlmodule = require('url');
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
}