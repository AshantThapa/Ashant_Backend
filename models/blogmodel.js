var db= require('../config/databaseconfig')

const blog= db.sequelize.define('blog',{
id:{
	type: db.Sequelize.INTEGER,
	allowNull:false,
	autoIncrement:true,
	primaryKey:true
},

	
	title:{
		type:db.Sequelize.STRING,
		allowNull:false
	}, 	


	description: {
    	type: db.Sequelize.STRING,
    	allowNull: false
  }

},

{
	freezeTableName:true,
	tableName:'blog'
}

);
blog.sync({force:false})
.then(function(result){
	console.log(result);

})
.catch(function(err){
	console.log(err)
})
module.exports={
	blog
}
