var express= require('express');
var application= new express();
var bodyParser= require('body-parser');

var path = require('path');
var fs = require("fs");
var cors = require('cors');
var multer = require('multer')
const usermodel = require('./models/usermodel');
const blogmodel = require('./models/blogmodel');
const imagemodel = require('./models/imagemodel');
const questionmodel = require('./models/questionmodel');
var usercontroller= require('./controller/usercontroller');
var authController= require('./controller/AuthenticationController');
var blogcontroller = require('./controller/blogcontroller');
var imagecontroller= require('./controller/imagecontroller');
var questioncontroller= require('./controller/questioncontroller');



application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: true }));


application.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'content-type');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type','application/json');
	next();
})






var publicDir = require('path').join(__filename,'/images');
 application.use(express.static(publicDir));

 application.use(express.static('public'));

application.use('/images', express.static(__dirname + '/images'));

var mystorage =multer.diskStorage({
  destination:function (req,file,cb) {
   cb(null,'images')
  },
  filename:(req,file,cb)=> {
   cb(null, 'img' + Date.now()+file.originalname )
  }
 })

 var images = multer({storage:mystorage});


//  var publicDir = require('path').join(__filename,'/agricultureimage');
//  application.use(express.static(publicDir));

//  application.use(express.static('public'));



// application.use('/agricultureimage', express.static(__dirname + '/agricultureimage'));


//  var mystorage =multer.diskStorage({
//   destination:function (req,file,cb) {
//    cb(null,'agricultureimage')
//   },
//   filename:(req,file,cb)=> {
//    cb(null, 'img' + Date.now()+file.originalname )
//   }
//  })

//  var agricultureimage = multer({storage:mystorage});








application.post('/v1/registers'

// ,usercontroller.validation
,usercontroller.validator
,usercontroller.hashGenerator
,usercontroller.registeruser,function(req,res,next){
console.log(req.body);
	res.status(201);
	res.send({"message":"User was registered successfully"});
	// res.status(201);
	// res.send({"message":"okay"})
});


// application.get('/v1/registers', function(req,res) {

// 	usermodel.User.findAll({
// 			attributes: ['id','firstname','lastname','address','email', 'password']
// 	})
// 	.then(function(result){
// 		// console.log(result);
// 		res.json(result);
// 	})
// 	.catch(function(err){

// 	})

// })

application.get('/v1/registers', usercontroller.getuser, function(req, res, next) {
	// console.log(req.params.id);
})

application.get("/v1/myUsers/:id",
	function (req, res, next) {
		console.log(req.params.id);
		usermodel.myUsers.findAll({
			where:{id:req.params.id}
			
		})
			.then(function (result) {
			
				res.json(result);
				console.log(result)
			})
			.catch(function (err) {
				res.json(err)
				console.log(err);
			})


	});



//update 
application.put("/v1/myUsers/:id", usercontroller.updateUser, function(req, res) {
res.send({"message":"Profile updated successfully"});

})

//delete

application.delete('/v1/registers/:id', usercontroller.deleteuser, function(req, res, next) {
	// console.log(req.params.id)

	res.status(201);
	res.send({"message": "user successfully deleted"})
		next();
	
		})

//question

application.post('/v1/addquestion', 
 questioncontroller.questionadd,
	function (req, res, next) {
	res.status(201);
	res.send({"message":"Question was added successfully"});

	});

application.get('/v1/viewquestion', function(req,res) {

	questionmodel.ques.findAll({
			attributes: ['id','question']
	})
	.then(function(result){
		// console.log(result);
		res.json(result);
	})
	.catch(function(err){

	})

})

//get question
application.get('/v1/viewquestion/:id', questioncontroller.getquestion, function(req, res) {
	console.log(req.params.id);
})


//blog

application.post('/v1/addblog', 
 blogcontroller.blogadd,
	function (req, res, next) {
	res.status(201);
	res.send({"message":"Blog was added successfully"});

	});



application.get('/v1/addblog', function(req,res) {

	blogmodel.blog.findAll({
			attributes: ['id','title','description']
	})
	.then(function(result){
		// console.log(result);
		res.json(result);
	})
	.catch(function(err){

	})

})

//get blog
application.get('/v1/addblog/:id', blogcontroller.getblog, function(req, res) {
	console.log(req.params.id);
})

//update 
application.put('/v1/addblog/:id', blogcontroller.updateblog, function(req, res) {


})

//delete 
	application.delete('/v1/addblog/:id', blogcontroller.deleteblog, function(req, res, next) {
		// console.log(req.params.id)
	
		res.status(201);
		res.send({"message": "Blog successfully deleted"})
			next();
		
			})








//delete user

application.delete('/v1/registers/:id', usercontroller.deleteuser, function(req, res, next) {
	// console.log(req.params.id)

	res.status(201);
	res.send({"message": "user successfully deleted"})
		next();
	
		})

//login routes
application.post('/v1/verify', authController.validation, authController.check, authController.jwtTokenGen, authController.sendUserData,
function(req, res, next) {
res.status(200);
res.send(
			{
				"message": "Login success !",
				"token": req.genToken,
				"result": result
			}
		);



	});


//image

application.post('/v1/addimage', 
images.single('img'),
imagecontroller.imageadd,
	function (req, res, next) {
	res.status(201);
	res.send({"message":"Image was inserted successfully"})
	// res.status(201);
	// res.send({"message":"okay"})
	});


application.get('/v1/addimage', function(req,res) {

	imagemodel.img.findAll({
			attributes: ['id','img','title','description']
	})
	.then(function(result){
		// console.log(result);
		res.json(result);
	})
	.catch(function(err){

	})

})

//get image
application.get('/v1/addimage/:id', imagecontroller.getimage, function(req, res) {
	console.log(req.params.id);
})

//update 
application.put('/v1/addimage/:id', imagecontroller.updateimage, function(req, res) {


})

//delete
	application.delete('/v1/addimage/:id', imagecontroller.deleteimage, function(req, res, next) {
		// console.log(req.params.id)
	
		res.status(201);
		res.send({"message": "Image successfully deleted"})
			next();
		
			})




application.use(function(err, req, res, next) {

	// console.log(err.status);
	// console.log(err.message);
	// console.log(err);
	res.status(err.status);
	res.send({
		"message": err.message
	});

	console.log(err.status);
	console.log(err.message);
})

// console.log('app running')

const port = process.env.PORT;
application.listen(port, () => console.log(`server of port ${port} is working`));
module.exports = application;


// const port = process.env.PORT | 8080;

// application.listen(port, () => console.log(`server of port ${port} is working`));