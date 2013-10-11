
var https = require('https');


/**
 * StockTwits constructor
 *
 * @param {Object} options
 * @api public
 */

function StockTwits (options) {
    var options = options || {};
    this.version = (options.version && options.version.toString()) || '2';
}

/**
 * Convert an object to a query string
 *
 * @param {Object} params
 * @api public
 */

StockTwits.prototype.toQueryString = function (params) {
    var result = [];
    for (var name in params) {
        result.push(name+'='+params[name]);
    }
    return result.join('&');
}

/**
 * Create url path
 *
 * @param {String} api
 * @param {Object} params
 * @api public
 */

StockTwits.prototype.getPath = function (api, params) {
    var params = params || {},
        path = ['/api', this.version, api+'.json'].join('/');
    if (Object.keys(params).length) {
        path += '?'+this.toQueryString(params);
    }
    return path;
}

/**
 * Make a GET request
 *
 * @param {String} api
 * @param {Object} params
 * @param {Function} cb
 * @api public
 */

StockTwits.prototype.get = function (api, params, cb) {
    if (typeof params === 'function') {
        cb = params;
        params = {};
    }
    https.request({
        hostname: 'api.stocktwits.com',
        port: 443,
        path: this.getPath(api, params),
        method: 'GET'
    }, function (res) {
        var buff = '';
        res.on('data', function (chunk) {
            buff += chunk;
        })
        .on('end', function () {
            res.raw = buff.toString();
            try {
                res.body = JSON.parse(res.raw);
                res.limit = parseInt(res.headers['x-ratelimit-limit']||0);
                res.remaining = parseInt(res.headers['x-ratelimit-remaining']||0);
                res.reset = new Date(res.headers['x-ratelimit-reset']||0);
                if (res.body.response.status != 200) return cb(res.body, res);
                cb(null, res);
            } catch (e) {
                cb(new Error(res.raw), res);
            }
        });
    })
    .on('error', function (err) {
        cb(err);
    })
    .end();
}

/**
 * Make a POST request
 *
 * @param {String} api
 * @param {Object} params - url params
 * @param {Object} data - post params
 * @param {Function} cb
 * @api public
 */

StockTwits.prototype.post = function (api, params, data, cb) {
    var content = this.toQueryString(data);
    https.request({
        hostname: 'api.stocktwits.com',
        port: 443,
        path: this.getPath(api, params),
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Content-Length': content.length,
        }
    }, function (res) {
        var buff = '';
        res.on('data', function (chunk) {
            buff += chunk;
        })
        .on('end', function () {
            res.raw = buff.toString();
            try {
                res.body = JSON.parse(res.raw);
                res.limit = parseInt(res.headers['x-ratelimit-limit']||0);
                res.remaining = parseInt(res.headers['x-ratelimit-remaining']||0);
                res.reset = new Date(res.headers['x-ratelimit-reset']||0);
                if (res.body.response.status != 200) return cb(res.body, res);
                cb(null, res);
            } catch (e) {
                cb(new Error(res.raw), res);
            }
        });
    })
    .on('error', function (err) {
        cb(err);
    })
    .end(content);
}

module.exports = new StockTwits();
module.exports.StockTwits = StockTwits;
