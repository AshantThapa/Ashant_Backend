# Agriculture Assistance

Name: Ashant Thapa

CollegeID: 170002

Batch: SeptB

Agriculture assist is a wep app that posts valuable information about agriculture. Most of the work is done by admin, from posting articles to images. The user can change their information as well too. The user can view those posts and change their profiles and submit their questions regarding to agriculture. 

## List of Main Features
 - Use API like get, post, put and delete to insert, update and delete the data.

 - Dual login system i.e. admin and user login system.

 - Both users can update their information.

 - Use of tokens for authorization purposes.

## API Documentation

The main APIs used in this system are:

- POST   -> For Storing the data into the database.
- GET    -> For retrieving data from the database.
- PUT    -> For updating the data and store the updated data.
- DELETE -> For deleting teh unnecessary data from the database


Sample

// for posting data to database

application.post('/v1/addblog', 
 blogcontroller.blogadd,
	function (req, res, next) {
	res.status(201);
	res.send({"message":"Blog was added successfully"});

	});




// get the data
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


application.get('/v1/addblog/:id', blogcontroller.getblog, function(req, res) {
	console.log(req.params.id);
})


//update data

application.put('/v1/addblog/:id', blogcontroller.updateblog, function(req, res) {


})


//delete data

application.delete('/v1/addblog/:id', blogcontroller.deleteblog, function(req, res) {
	
		res.status(201);
		res.send({"message": "Blog successfully deleted"})
		
			})




