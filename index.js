var config  = require('config')
  , url     = require('url')
  , _       = require('lodash')
  ;

config.getUrl = function(key) {
  if (config.has('key')) {
    var ret = config.get('key');

    if (_.isString(ret)) {
      return ret;
    }

    if (_.isObject(ret)) {
      if (ret.url) {
        return ret.url;
      }

      if (ret.hostname) {
        return url.format({
            hostname  : ret.hostname
          , port      : ret.port
          , protocol  : ret.protocol
        });
      }
    }
  }

  return config.get(key);
}

config.getUrlObject = function(key) {
  if (config.has('key')) {
    var ret = config.get('key');

    if (_.isString(ret)) {
      return url.parse(ret);
    }

    if (_.isObject(ret)) {
      if (ret.url) {
        return url.parse(ret.url);
      }

      if (ret.hostname) {
        return _.pick(ret, 'hostname', 'port', 'protocol');
      }
    }
  }

  return config.get(key);
}

module.exports = config;