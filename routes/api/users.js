const express = require('express');
const router  = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');


// User Model
const User = require('../../models/User');

// @route  Post /host/api/user/signup
// @desc   Register New User
// @access Public
router.post('/signup',(req,res)=>{
	const { username,password } = req.body;

	//Simple Validation
	if(!username || !password){
		return res.status(400).json({msg: 'Please Enter All Fields'});
	}

	//Check For Existing User
	User.findOne({username})
		.then(user => {
			if(user){
				return res.status(400).json({msg: 'Username Already Exists'});
			}
			const newUser = new User({
				username,
				password
			});

			//Create salt & hash
			bcrypt.genSalt(10 , (err , salt) => {
                bcrypt.hash(newUser.password , salt , (err , hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    	.then(user => {
                    		jwt.sign(
								{ id: user.id },
								config.get('jwtSecret'),
								{ expiresIn: 3600 },
								(err,token) => {
									if(err) throw err;
									res.json({
									token,
	                    			user:{
	                    				id: user.id,
	                    				username: user.username,
	                    			}
	                    		})
								}
                    		)
						})
                    	.catch(err => console.log(err));
                });
          	});

		})
});


// @route  Post /host/api/user/login
// @desc   Auth User
// @access Public
router.post('/login',(req,res)=>{
	const { username,password } = req.body;

	//Simple Validation
	if(!username || !password){
		return res.status(400).json({msg: 'Please Enter All Fields'});
	}

	//Check For Existing User
	User.findOne({username})
		.then(user => {
			if(!user){
				return res.status(400).json({msg: 'User Does Not Exists'});
			}
			//Validate Password
			bcrypt.compare(password,user.password)
				.then(isMatch => {
					if(!isMatch) return res.status(400).json({msg: 'Invalid Credentials'});
					jwt.sign(
						{ id: user.id },
						config.get('jwtSecret'),
						{ expiresIn: 3600 },
						(err,token) => {
							if(err) throw err;
							res.json({
							token,
                			user:{
                				id: user.id,
                				username: user.username
                			}
                		})
						}
            		)
				})

		})
});


module.exports = router;
