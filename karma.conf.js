module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['mocha', 'fixture'],
        reporters: ['progress'],
        basePath: '',
        files: [
            //{pattern: 'test/fixtures/*.html', watched: false, included: false, served: true},
            'node_modules/babel-polyfill/dist/polyfill.js',
            'test/fixtures/*.html',
            'test/**/*.spec.js'
        ],

        webpackMiddleware: {
            stats: {
                chunkModules: false,
                colors: true
            }
        },

        preprocessors: {
            'test/fixtures/*.html': ['html2js'],
            './test/**/*.spec.js': ['webpack'],
            './src/**/*.js': ['webpack']
        }
    });
};