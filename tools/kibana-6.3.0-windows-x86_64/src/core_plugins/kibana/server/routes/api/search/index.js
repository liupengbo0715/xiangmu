'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchApi = searchApi;

var _register_count = require('./count/register_count');

var _register_count2 = _interopRequireDefault(_register_count);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function searchApi(server) {
  (0, _register_count2.default)(server);
}