import test from 'ava';
import {Http} from '../Modules/Api';

test('can build uri', function(t){
	const http = new Http();
	const url = http.buildUri('test');
	t.is('http://thenetwork.fusecourse.test/api/test', url);
});

test('can build uri with query string', function(t){
	const http = new Http();
	const url = http.buildUri('test', {key: 'value', 'orderBy': 'latest'});
	t.is('http://thenetwork.fusecourse.test/api/test?key=value&orderBy=latest', url);
});

test('can set headers', function(t){
	const http = new Http();
	http.headers({
		'X-APP-ID': '1234567'
	});

	t.deepEqual({
		'Content-Type': 'application/json',
		'Accept' : 'application/json',
		'X-APP-ID': '1234567'
	}, http.reqHeaders)
});

test('can set header', function(t){
	const http = new Http();
	http.header('X-APP-ID', '1234567');
	t.deepEqual({
		'Content-Type': 'application/json',
		'Accept' : 'application/json',
		'X-APP-ID': '1234567'
	}, http.reqHeaders)
});

test('can set body', function(t){
	const http = new Http();
	http.body({
		key: 'value',
		name: 'Mohammed'
	});

	t.deepEqual({
		key: 'value',
		name: 'Mohammed'
	}, http.reqBody);
});

test('can initiate get request', function(t){
	const http = new Http();
	http.get('test');

	t.is('http://thenetwork.fusecourse.test/api/test', http.url);
	t.is('get', http.method);
});

test('can initiate post request', function(t){
	const http = new Http();
	http.post('test');

	t.is('http://thenetwork.fusecourse.test/api/test', http.url);
	t.is('post', http.method);
});

test('can initiate put request', function(t){
	const http = new Http();
	http.put('test');

	t.is('http://thenetwork.fusecourse.test/api/test', http.url);
	t.is('put', http.method);
});

test('can initiate delete request', function(t){
	const http = new Http();
	http.delete('test');

	t.is('http://thenetwork.fusecourse.test/api/test', http.url);
	t.is('delete', http.method);
});

