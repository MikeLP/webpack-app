var path = require('path'),
    webpack = require('webpack'),
    extractTextPlugin = require('extract-text-webpack-plugin'),
    root = __dirname,
    config = {},
    extractTextPlugin = new extractTextPlugin('assets/style.css'),
    env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'production';

if (env == 'production') {
    config = require('./webpack.production.js');
} else if (env == 'development') {
    config = require('./webpack.development.js');
} else if (env == 'test') {
    config = require('./webpack.test.js');
}

var plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin('commons.js'),
    new webpack.DefinePlugin({
        ENV: JSON.stringify(env), // 'development' | 'test' | 'production'
    }),
    new webpack.ProvidePlugin({}),
    extractTextPlugin
];

if (config.uglify) plugins.push(new webpack.optimize.UglifyJsPlugin({
    output: {
        comments: false
    }
}));

module.exports = {
    context: path.resolve(root, 'app'),
    devtool: config.devtool,
    extensions: ['', '.js', '.styl', '.css'],
    entry: {
        app: path.resolve(root, 'app/js/main.js'),
        // test: path.resolve(root, 'app/js/libs/test.js')
    },
    output: {
        path: path.resolve(root, 'public'),
        libraryTarget: 'umd',
        filename: '[name].bundle.js',
        publicPath: '/assets/',
    },
    resolve: {
        alias: {
            css: path.resolve(root, 'app/stylus'),
            libs: path.resolve(root, 'app/js/libs'),
            templates: path.resolve(root, 'app/templates')
        },
    },
    module: {
        loaders: [{
            test: [/\.styl$/, /\.css$/],
            loader: extractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
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
        // '/some/path*': {
        //     target: 'https://other-server.example.com',
        //     secure: false,
        // },
    }
};
