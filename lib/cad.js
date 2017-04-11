'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cad;

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cad() {
  return {
    fetch: function fetch() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var deferred = _q2.default.defer();
      var optionOverrides = {};
      if (options.hasOwnProperty('date-min')) {
        if (!(0, _util.validateDate)(options['date-min']) && !(0, _util.validateDateTime)(options['date-min'])) {
          if (options['date-min'] !== 'now') {
            return (0, _util.handleError)('date-min is not in a valid format.', deferred);
          }
        }
      }
      if (options.hasOwnProperty('date-max')) {
        if (!(0, _util.validateDate)(options['date-max']) && !(0, _util.validateDateTime)(options['date-max'])) {
          if (options['date-max'].match(/^[+]\d+$/)) {
            optionOverrides['date-max'] = options['date-max'].replace(/[+]/, '%2B');
          } else if (options['date-max'] !== 'now') {
            return (0, _util.handleError)('date-max is not in a valid format.', deferred);
          }
        }
      }
      (0, _util.sendRequest)('https://ssd-api.jpl.nasa.gov/cad.api', Object.assign({}, options, optionOverrides), function (err, data) {
        if (err) return deferred.reject(err);
        return deferred.resolve(data);
      }, true);
      return deferred.promise;
    }
  };
}
module.exports = exports['default'];