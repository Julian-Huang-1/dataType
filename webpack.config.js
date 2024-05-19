// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');

const isProduction = process.env.NODE_ENV == 'development';


const config = {
    entry: './src/main.jsx',
    output: {
        path: path.resolve(__dirname, 'output'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

        ],
    },
    devtool: "inline-source-map"
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';


    } else {
        config.mode = 'development';
    }
    return config;
};
