var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var path = require('path');

module.exports = {
    entry: {
        "app": ["./src/main.js", "./src/styles.js"]
    },
    output: { path: './dist', filename: 'app.bundle.js' },
    module: {
        loaders: [
            { test: /\.scss$/, loaders: [
                    {
                        loader: 'file',
                        query: {
                            name: '[name].css'
                        }
                    }, 'extract', 'css?-url', 'sass' // compile with sass, then css, then extract to file
                ] 
            }
        ]
    },
    resolve: {
        extensions: ['', '.css', '.sass', '.scss', '.js',
            // bootstrap fonts
            //'.eot'
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new CopyWebpackPlugin([ { from: 'public' },
            {
                from: 'node_modules/bootstrap-sass/assets/fonts/bootstrap/*',
                to: 'assets/fonts',
                flatten: true
            },
            {
                from: 'node_modules/font-awesome/fonts/*',
                to: 'assets/fonts',
                flatten: true
            },
        ]),
    ],

    // sass config
    sassLoader: {
        includePaths: [
            // path.resolve(__dirname, "./node_modules/bootstrap/assets"),
            // path.resolve(__dirname, "./include")
        ]
    }
}