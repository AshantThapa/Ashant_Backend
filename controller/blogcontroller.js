var blogmodel = require('../models/blogmodel')


//add a blog
function blogadd(req,res,next){
console.log(req.body)
blogmodel.blog.create({
	title: req.body.title,
	description: req.body.description,
	
})
.then(function(result){

	next()
})
.catch(function(err){
	next({"status":500, "message":"Something Went Wrong"});
	console.log(err);
	
})

next()
}



 function getblog(req,res){
    blogmodel.blog.findOne({
        where:{id:req.params.id}
    })
        .then(function (result) {
            res.status(200);
            res.json(result);
            
        })
        .catch(function(err){
            res.json(err);
        })
    }


    //update blog


   function updateblog(req, res) {
		blogmodel.blog.update({
		
            title: req.body.title,
            description: req.body.description,

		}, {
			where: {
				id: req.params.id
			}
		})
		.then(function(result) {
			res.status(201);
			res.send({
				"message": "Blog updated succesfuly"
			})
		})
		.catch(function(err) {

		})
	}
    
   
   function deleteblog(req,res,next){
    blogmodel.blog.destroy({
        where:{id:req.params.id}
    })
        .then(function(){
            res.status(200);
            res.send({
                "message":"Blog deleted successfully"
            })

        })
        .catch(function (err) {
            next({"status":500,"message":"could not delete"})
        })
    next()
} 


module.exports={
    blogadd,
    getblog,
    updateblog,
    deleteblog
    
}