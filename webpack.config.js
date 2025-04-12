const config = {
    mode: 'production',
    entry: {
        index: './src/scripts/main.js',
    },
    output: {
        filename: 'main.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            
            },
        ],
    },
};

export default config;