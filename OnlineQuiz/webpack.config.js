var path = require('path');

module.exports = {
    entry: path.join(__dirname, 'ClientApp/app'),
    output: {
        path: path.join(__dirname, 'wwwroot/js'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react']
                    }                    
                }
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".es6"]
    },
    watch: true
};