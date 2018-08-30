const Observable = require('FuseJS/Observable');
const Storage = require('FuseJS/Storage');

const instance = Observable();

function Auth(){
	this.token = Observable('');
}

/**
 * get auth singleton
 * @return {Auth}
 */
Auth.singleton = function(){
	if(!instance.value){
		instance.value = new Auth();
	}
	return instance.value;
}

/**
 * save token to storage
 * @return {Auth}
 */
Auth.prototype.saveToStorage = function() {
	Storage.write('token.txt', this.token.value);

	return this;
};

/**
 * read token from storage
 * Promise will resolve with false if file or contents were not found
 * and it will resolve with the token if file and contente were found
 * will reject when an error happens
 * @return {Promise}
 */
Auth.prototype.readFromStorage = function() {
	return Storage.read('token.txt')
		.then(contents => {
			if(!contents){
				return Promise.resolve(false);
			}

			this.token.value = contents;
			return Promise.resolve(contents);
		});
};

/**
 * set Token
 * * @return {Auth}
 */
Auth.prototype.setToken = function(token) {
	this.token.value = token;
	return this;
};

/**
 * get Token
 * @return {string}
 */
Auth.prototype.getToken = function() {
	return this.token.value;
};

module.exports = Auth;