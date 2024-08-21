const path = require('path');

module.exports = {
    entry: './script.js',
    output: {
        filename: 'shell.js',
        path: path.resolve(__dirname, ''),
        publicPath: '/',
    },
    mode: 'development'
};
