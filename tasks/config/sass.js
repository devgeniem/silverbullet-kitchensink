module.exports = function(grunt) {

    var options = {};

    if (process.env.NODE_ENV === 'production') {
        options = {
            outputStyle: 'compressed',
            sourceMap: false,
            sourceComments: false,
        };
    } else {
        options = {
            expanded: true,
        };
    }

    grunt.config.set('sass', {
        options: options,
        dev: {
            files: {
                '.tmp/public/styles/importer.css': 'assets/styles/importer.scss',
            },
        },
        build: {
            files: {
                '.tmp/public/styles/importer.css': 'assets/styles/importer.scss',
            },
        }
    });

    grunt.loadNpmTasks('grunt-sass');
};
