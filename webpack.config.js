var path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, ''),
        filename: 'transpiled.js',
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
        inline:true,
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loaders: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};
