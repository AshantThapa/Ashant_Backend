var db= require('../config/databaseconfig')

const myUsers= db.sequelize.define('myUsers',{
id:{
	type: db.Sequelize.INTEGER,
	allowNull:false,
	autoIncrement:true,
	primaryKey:true
},

	firstname:{
		type:db.Sequelize.STRING,
		allowNull:false
	},

	lastname:{
		type:db.Sequelize.STRING,
		allowNull:false
	},

	address:{
		type:db.Sequelize.STRING,
		allowNull:false
	},

	email:{
		type:db.Sequelize.STRING,
		allowNull:false
	},

	password:{
		type:db.Sequelize.STRING,
		allowNull:false
	}, 	


	usertype: {
    	type: db.Sequelize.STRING,
    	allowNull: false
  }

},

{
	freezeTableName:true,
	tableName:'my_users'
}

);
myUsers.sync({force:false})
.then(function(result){
	console.log(result);

})
.catch(function(err){
	console.log(err)
})
module.exports={
	myUsers
}
