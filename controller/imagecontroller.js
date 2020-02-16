var imagemodel = require('../models/imagemodel');

function imageadd(req,res,next){
console.log(req.body)
imagemodel.img.create({
	img: req.file.filename,
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


function getimage(req,res){
    imagemodel.img.findOne({
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

function updateimage(req, res) {
		imagemodel.img.update({
			
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
				"message": "Image updated succesfuly"
			})
		})
		.catch(function(err) {

		})
	}


function deleteimage(req,res,next){
    imagemodel.img.destroy({
        where:{id:req.params.id}
    })
        .then(function(){
            res.status(200);
            res.send({
                "message":"Image deleted successfully"
            })

        })
        .catch(function (err) {
            next({"status":500,"message":"Could not delete"})
        })
    next()
}

module.exports={
    imageadd,
    getimage,
    updateimage,
    deleteimage
    
} 

    