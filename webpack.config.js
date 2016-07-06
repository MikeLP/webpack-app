// let path = require('path'),     webpack = require('webpack'),     extractTextPlugin =
// require('extract-text-webpack-plugin'),     root = __dirname,     config = {},     extractTextPlugin = new
// extractTextPlugin('assets/style.css'),     env = process.env.NODE_ENV         ? process.env.NODE_ENV.trim()         :
// 'production';

let path = require('path');

let webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

let env = global.process.env.NODE_ENV ? global.process.env.NODE_ENV.trim() : 'production',
    config = {},
    plugins = [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            ENV: JSON.stringify(env), // 'development' | 'test' | 'production'
        }),
        new webpack.ProvidePlugin({}),
        new ExtractTextPlugin('assets/css/style.css')
    ];

if (env == 'production') {
    config = require('./webpack.production.js');
} else if (env == 'development') {
    config = require('./webpack.development.js');
} else if (env == 'test') {
    config = require('./webpack.test.js');
}

if (config.uglify) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false
        }
    }));
}

module.exports = {
    context: path.resolve(__dirname, 'app'),
    devtool: config.devtool,
    extensions: [
        '', '.js', '.styl', '.css'
    ],
    entry: {
        app: path.resolve(__dirname, 'app/js/main.js'),
        // test: path.resolve(root, 'app/js/libs/test.js')
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/assets/'
    },
    resolve: {
        alias: {
            css: path.resolve(__dirname, 'app/stylus'),
            libs: path.resolve(__dirname, 'app/js/libs'),
            templates: path.resolve(__dirname, 'app/templates')
        }
    },
    module: {
        loaders: [{
            test: [
                /\.styl$/, /\.css$/
            ],
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
        }, {
            test: /\.(woff|svg|ttf|eot)([\?]?.*)$/,
            loader: "file-loader?name=[name].[ext]"
        }]
    },
    plugins: plugins,
    devServer: {
        contentBase: path.resolve(root, 'public')
    },
    proxy: {
        // '/some/path*': {     target: 'https://other-server.example.com',     secure: false, },
    }
};
