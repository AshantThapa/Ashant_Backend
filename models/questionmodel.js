var db= require('../config/databaseconfig')

const ques= db.sequelize.define('ques',{
id:{
	type: db.Sequelize.INTEGER,
	allowNull:false,
	autoIncrement:true,
	primaryKey:true
},

	
	question:{
		type:db.Sequelize.STRING,
		allowNull:false
	}

},

{
	freezeTableName:true,
	tableName:'ques'
}

);
ques.sync({force:false})
.then(function(result){
	console.log(result);

})
.catch(function(err){
	console.log(err)
})
module.exports={
	ques
}
