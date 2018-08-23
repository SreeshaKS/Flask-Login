const path = require('path');
const APP_DIR = path.resolve('src/client');

module.exports = {
    entry : path.resolve('src/client', 'app.js'),
    output : {
        path : path.resolve('src/client/dist'),
        filename : "bundle.js"
    },
    module : {
        rules : [{
            test : /\.jsx?/,
            include : APP_DIR,
            loader : 'babel-loader',
            exclude: '/node_modules/',
            query: {
                presets: ['es2015', 'react', 'stage-2']
            }
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    watch:true
}
