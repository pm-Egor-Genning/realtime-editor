// setup JSDOM
require('jsdom-global')();

// make expect available globally
global.expect = require('expect');
global.describe = require('describe');
global.beforeAll = require('beforeAll');
global.beforeEach = require('beforeEach');
global.it = require('it');
global.jest = require('jest');
