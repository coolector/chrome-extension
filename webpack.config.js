const path = require("path");
const BowerResolvePlugin = require("bower-resolve-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

module.exports = {
    entry: {
        content: "./content.js",
        background: "./background.js",
        options: "./options.js"
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].js"
    },
    resolve: {
        plugins: [
            new BowerResolvePlugin()
        ],
        modules: [
            'bower_components',
            'node_modules',
            path.join(
                __dirname,
                'bower_components/bootstrap/dist/css'
            ),
            path.join(
                __dirname,
                'bower_components/bootstrap/dist/js'
            )
        ],
        alias: {
            'emitter': path.resolve(__dirname, 'node_modules/component-emitter/index.js'),
        },
        descriptionFiles: ['bower.json', 'package.json'],
        mainFields: ['main', 'browser']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },
            {   test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.handlebars$/,
                loader: "handlebars-loader"
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};
