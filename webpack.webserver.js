'use strict';

var webpack = require('webpack'),
    path = require('path'),
    webpackDevServer = require('webpack-dev-server'),
    host = '127.0.0.1',
    port = 8080,
    config = require('./webpack.config.js'),
    compiler = webpack(config),
    server = new webpackDevServer(compiler, {
        stats: {
            colors: true
        },
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: '/assets/'
    });

// server.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

process.argv.forEach(function (val, index, array) {
    if (val.indexOf('=') !== -1) {
        var value = val.split('=');
        if (value[0] === 'ip') {
            host = value[1];
        }
    }
});

server.listen(port, host)
