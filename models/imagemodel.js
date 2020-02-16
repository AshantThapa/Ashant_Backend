var db= require('../config/databaseconfig')

const img= db.sequelize.define('img',{
id:{
	type: db.Sequelize.INTEGER,
	allowNull:false,
	autoIncrement:true,
	primaryKey:true
},

img:{
		type:db.Sequelize.STRING,
		allowNull:false
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
	tableName:'images'
}

);

img.sync({force:false})
.then(function(result){
	console.log(result);

})
.catch(function(err){
	console.log(err)
})
module.exports={
	img
}