const Observable = require('FuseJS/Observable');
const Storage = require('FuseJS/Storage');

const instance = Observable();

function User(){
	this.id = '';
	this.name = '';
	this.email = ''

	this.is_logged_in = Observable(false);
}
/**
 * singleton design pattern
 * @return {User}
 */
User.singleton = function(){
	if(!instance.value){
		instance.value = new User();
	}
	return instance.value;
}

/**
 * update User Info
 * @param  {object} newUserInfo
 * @return {User}
 */
User.prototype.update = function(newUserInfo) {
	this.id = newUserInfo.id;
	this.name = newUserInfo.name;
	this.email = newUserInfo.email

	return this;
};

/**
 * set user as logged in
 */
User.prototype.setLoggedIn = function() {
	this.is_logged_in.value = true;

	return this;
};

/**
 * set user as logged out
 */
User.prototype.setLoggedOut = function() {
	this.is_logged_in.value = false;
	return this;
};

/**
 * save current user info to Storage
 * @return {User}
 */
User.prototype.saveToStorage = function(){
	let content = {
		id: this.id,
		name: this.name,
		email: this.email
	};

	Storage.write('userinfo.txt',JSON.stringify(content));
}

/**
 * try getting user info from storage
 * @return {Promise}
 */
User.prototype.readFromStorage = function(){
	return Storage.read('userinfo.txt')
		.then(content => {
			if(!content.length){
				this.update({});
				this.setLoggedOut();
				return Promise.resolve('noinfo');
			}

			content = JSON.parse(content);
			this.update(content);
			this.setLoggedIn();
			return Promise.resolve(content);
		});
}

module.exports = User;

