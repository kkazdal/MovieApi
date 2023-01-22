const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const bearerHeader = req.headers['authorization'];
	if (bearerHeader) {
	
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		req.token = bearerToken;
	  } 

	const token = req.headers['x-access-token'] 
	|| req.body.token 
	|| req.query.token
	|| req.token;

	console.log(token);

	if(token){
		jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
			if (err){
				res.json({
					status: false,
					message: 'Failed to authenticate token.'
				})
			}else{
				req.decode = decoded;
				next();
			}
		});
	}else{
		res.json({
			status: false,
			message: 'No token provided.'
		})
	}
};   