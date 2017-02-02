let path = require('path');
module.exports = {
    entry: path.join(__dirname, 'app', 'controller', 'index.js'),
    output: {
        path: path.join(__dirname, './public'),
        filename: 'bundle.js',
    },
};
