var http = require('http');
var request = require('request');
var querystring = require('querystring');
var urlmodule = require('url');
var logger = require('../../config/log').logger;  
var mock = require('../mock/data')

module.exports = {
	test(req,res,next){
		console.log('test');		
		res.json({"success":true})
	},
	login(req,res,next){
		var data = mock.login();
		var params = req.query;  // 获取参数		
		data.params = params;		
		res.json(data);
	},
	userInfo(req,res,next){
		var data = mock.userInfo();	
		var params = req.query;  // 获取参数		
		data.params = params;		
		res.json(data)
	}	
}