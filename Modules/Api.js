const Config = require('../Config');
const Logger = require('./Logger');
const Auth = require('./Auth');
const Uploader = require('Community/Uploader');

function Http(){
	this.url = '';

	this.method = 'get';

	this.reqHeaders = {
		'Content-Type': 'application/json',
		'Accept' : 'application/json'
	}
	this.reqBody = {};

	this.status = '';
}

Http.prototype.baseUri = Config.baseUri;

/**
 * add headers to reqHeaders variable
 * @param  {object} headers
 * @return {Http}
 */
Http.prototype.headers = function(headers) {
	this.reqHeaders = Object.assign({}, this.reqHeaders, headers);
	return this;
};

/**
 * add one header to reqHeader Variable
 * @param  {string} key
 * @param  {mixed} value
 * @return {Http}
 */
Http.prototype.header = function(key, value) {
	this.reqHeaders[key] = value;
	return this;
};

/**
 * set reqBody
 * @param object body
 * @return {Http}
 */
Http.prototype.body = function(body) {
	this.reqBody = body;
	return this;
};

/**
 * start http request
 * @return {Promise}
 */
Http.prototype.call = function() {
	let request = {
		headers: this.reqHeaders,
		method: this.method
	};

	if(this.method != 'get'){
		request.body = JSON.stringify(this.reqBody);
	}

	return fetch(this.url,request)
		.then(response => {
			this.status = response.status;
			return response.json();
		})
};

/**
 * log and resolve json
 * @return Promise
 */
Http.prototype.json = function() {
	return this.call()
			.then(response => {
				this.log(response);
				return Promise.resolve({content: response, status: this.status})
			});
};

/**
 * initiate get request
 * @param  {string} url
 * @param  {object|string} query
 * @return {Http}
 */
Http.prototype.get = function(url, query = undefined) {
	this.url = this.buildUri(url, query);
	this.method = 'get';
	return this;
};

/**
 * initiate post request
 * @param  {string} url
 * @param  {object|string} query
 * @return {Http}
 */
Http.prototype.post = function(url, query = undefined) {
	this.url = this.buildUri(url, query);
	this.method = 'post';
	return this;
};

/**
 * initiate put request
 * @param  {string} url
 * @param  {object|string} query
 * @return {Http}
 */
Http.prototype.put = function(url, query = undefined) {
	this.url = this.buildUri(url, query);
	this.method = 'put';
	return this;
};

/**
 * initiate delete request
 * @param  {string} url
 * @param  {object|string} query
 * @return {Http}
 */
Http.prototype.delete = function(url, query = undefined) {
	this.url = this.buildUri(url, query);
	this.method = 'delete';
	return this;
};

/**
 * build request url
 * @param  {string} url   url path
 * @param  {object|string} query
 * @return {string}
 */
Http.prototype.buildUri = function(url, query) {
	if(typeof query === 'string'){
		return `${this.baseUri}/${url}?${query}`;
	}

	if(typeof query === 'object'){
		let queryVar = [];
		for(var key in query){
			if(!query.hasOwnProperty(key)){
				continue;
			}
			queryVar.push(`${key}=${query[key]}`);
		}
		return `${this.baseUri}/${url}?${queryVar.join('&')}`;
	}

	return `${this.baseUri}/${url}`;
};

/**
 * log response
 * @param  {object} response
 */
Http.prototype.log = function(response) {
	console.log(`
------------------------------
a ${this.method} request was made to ${this.url}
with Headers
${Logger.init(this.reqHeaders).toString()}
and Body
${Logger.init(this.reqBody).toString()}
and response status is ${this.status}
and response is
${Logger.init(response).toString()}
------------------------------
`);
};

Http.prototype.upload = function(url, file) {
	return Uploader.send(file, Config.baseUri + '/' + url, this.reqHeaders.Authorization)
		.then(response => {
			return Promise.resolve(JSON.parse(response));
		});
};

Http.prototype.authorized = function(){
	this.reqHeaders.Authorization = "Bearer " + Auth.singleton().token.value

	return this;
}

/**
 * create new Http instance
 * @return {Http}
 */
function init() {
	return new Http();
}

module.exports = {
	init,
	Http,
}