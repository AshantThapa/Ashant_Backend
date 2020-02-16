var usermodel= require('../models/usermodel');
const bcryptjs = require('bcryptjs');
var saltRounds = 10;

function validator(req,res,next){
// console.log(req.body)
	usermodel.myUsers.findOne({
		where: { email: req.body.email }
	})
		.then(function (result) {
			console.log(result.dataValues);
			if (result.dataValues != '') {
				next({ "status": 409, "message": 'Email already exists' })
			}
		})
		.catch(function (err) {
			next();
		})
}


function hashGenerator(req,res,next){
	req.body.password
	bcryptjs.hash(req.body.password, saltRounds)
	.then(function(hash){
		console.log(hash);
		req.hashvalue = hash;
		next();
	})
.catch(function(err){
	console.log(err)
	next()
// console.log(err)
})
}

function registeruser(req,res,next){
console.log(req.body)
usermodel.myUsers.create({
	firstname: req.body.firstname,
	lastname: req.body.lastname,
	address: req.body.address,
	email: req.body.email,
	password: req.hashvalue,
	usertype: 'user'
	
})
.then(function(result){

	next();
})
.catch(function(err){
	next({"status":500, "message":"Something Went Wrong"});
	console.log(err);
	
});
}

function getuser(req, res, next){

		usermodel.myUsers.findAll({
			 attributes: ['id', 'firstname', 'lastname', 'address', 'email']
    })
		.then(function (result) {
            
            res.json(result);

        })
        .catch(function (err) {
            // res.json(err);
        })
	}


function updateUser(req, res,next) {
		usermodel.myUsers.update({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			address: req.body.address,
			email: req.body.email,

		}, {
			where: {
				id: req.params.id
			}
		})
		.then(function(result) {
			res.status(201);
			res.send({
				"message": "User Edited succesfuly"
			})
		})
		.catch(function(err) {
			next({"status":500, "message":"Something went wrong"});
            console.log(err)
		})
	}


function deleteuser(req,res,next){

	usermodel.myUsers.destroy({
		where: { id: req.params.id}
	})
	.then(function(result) {
	
			res.status(200)
			res.send({"message": "Deleted succesfully"});
	
			})
	.catch(function(err) {
		next({
			"status": 500,
			"message": "Could not delete"})
		})
		next()

}
	




// function validation(req, res, next){

// const schema = {
// firstname:Joi.string().max(15).required(),
// lastname:Joi.string().max(15).required(),
// address:Joi.string().max(30).required(),
// email:Joi.string().max(30).required(),
// password:Joi.string().max(3).required()
// }

// const result = Joi.validate(req.body,schema);
// if(result.error){
// 	res.status(400).send(result.error.details[0].message);
// 		return;
// 	}
// }


module.exports={
	registeruser,
	hashGenerator,
	validator,
	getuser,
	updateUser,
	deleteuser
	// validation
}