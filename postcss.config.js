module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: [
                'last 5 Chrome versions',
                'last 5 Safari versions',
                'last 2 Firefox versions',
                'last 2 Edge versions',
            ],
            remove: false,
        }),
    ],
};
