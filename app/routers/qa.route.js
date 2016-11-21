var bodyParser = require('body-parser');
var qaController = require('../controllers/qa.controller');


module.exports = function (app) {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));	
	app.route('/test').post(qaController.test);
	app.route('/login').post(qaController.login);
	app.route('/user-info').get(qaController.userInfo);				
}