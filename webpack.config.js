module.exports = {
    entry: './client/client.js',
    output: {
        path:__dirname+'/public',
        filename: "client.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            }
        ]
    },
    externals: {
        'react': 'React'        
    },
    resolve: {
        extensions: ['','.js','.jsx']
    }
};