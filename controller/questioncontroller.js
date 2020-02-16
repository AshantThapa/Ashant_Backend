var questionmodel = require('../models/questionmodel')


//add a blog
function questionadd(req,res,next){
console.log(req.body)
questionmodel.ques.create({
	question: req.body.question,
	
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



 function getquestion(req,res){
    questionmodel.ques.findall({
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

module.exports={
    questionadd,
    getquestion
    
}
