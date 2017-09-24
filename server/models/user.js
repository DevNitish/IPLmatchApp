/* *This file is for data modeling.
Use this file for functions that need DB query 
 */
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
	name: String,
	email: {
		type: String,
		unique: true
	},
	password: String,
	idurl:String,
	mobile:String,
	createdon:Date,
	password:String
});

userSchema.statics.findAllUser = function (callback) {
	this.find({

	}, function (err, data) {
		if (!err) {
			callback(null, data);
		} else {
			callback(err, null);
		}

	})
};
userSchema.static.findUser=function(userDetail,callback){
	console.log("===find user");
	var thekey='';
	var thevalue='';
	if(userDetail._id){
		thekey='_id';
		thevalue=userDetail._id;
	}else{
		thekey='email';
		thevalue=userDetail.email;
	}
	 console.log("==db=",userDetail);
	console.log("the key",thekey,thevalue);
	this.findOne({
		thekey: thevalue
	}, function (err, data) {
		if (!err) {
	      callback(null, data);

		} else {
			callback(err, null);
		}

	})
};
userSchema.statics.editUser = function (userDetail, callback) {
	
	this.findOne({
		_id: userDetail._id
	}, function (err, data) {
		if (!err) {
			data.email = userDetail.email;
			data.name = userDetail.name;
			data.password = userDetail.password;
			data.mobile=userDetail.mobile,
			data.idurl=userDetail.idurl,
			data.password=userDetail.password
			data.save(function (err) {
				if (err)
					callback(err, null);
				else
					callback(null, data);
			})

		} else {
			callback(err, null);
		}

	})
};

userSchema.statics.saveUser = function (userDetail, callback) {
	var createdon=new Date();
	this.create({
		email: userDetail.email,
		name: userDetail.name,
		password: userDetail.password,
		mobile:userDetail.mobile,
		idurl:userDetail.idurl,
		createdon:createdon,
		password:userDetail.password

	}, function (err, result) {
		if (!err) {
			console.log('Data inserted successfully...');
			callback(null, result);
		} else {
			console.log('Data Error');

			callback(err, null);
		}
	});

};
userSchema.statics.deleteUser = function (userId, callback) {
	console.log("deleteUser id", userId);
	this.findOne({
		_id: userId

	}).remove().exec();
	callback(null, 'Deleted');

};

module.exports = mongoose.model('users', userSchema);