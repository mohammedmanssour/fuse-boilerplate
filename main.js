const User = require('Modules/User');
const Auth = require('Modules/Auth');

// sometimes User Model gets the value of undefined
// so creating it from main file ensure that
// we won't be having and undefined case
User.singleton().readFromStorage();

// sometimes Auth Model gets the value of undefined
// so creating it from main file ensure that
// we won't be having and undefined case
Auth.singleton().readFromStorage();