module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    sourceMap: true,
                    outputStyle: 'nested'
                },
                files: [{
                    expand: true,
                    cwd: 'sass/build/',
                    src: ['*.scss'],
                    dest: 'build/css/',
                    ext: '.css'
                }]
            }
        },

        postcss: {
            autoprefixer: {
                options: {
                    map: true,
                    processors: [
                        require('autoprefixer')
                    ]
                },
                files: [{
                    expand: true,
                    cwd: 'build/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/css/',
                    ext: '.css'
                }]
            }
        },

        cmq: {
            dist: {
                options: {
                    log: true,
                    ext: false
                },
                files: [{
                    expand: true,
                    cwd: 'build/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/css/',
                    ext: '.css'
                }]
            }
        },

        cssmin: {
            dist: {
                options: {
                    processImport: false
                },
                files: [{
                    expand: true,
                    cwd: 'build/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/css/',
                    ext: '.min.css'
                }]
            }
        },

        watch: {
            scss: {
                options: {
                    livereload: false,
                    spawn: true,
                    interval: 5007
                },
                files: ['sass/**/*.scss'],
                tasks: ['sass', 'postcss:dist']
            },
            css: {
                options: {
                    livereload: true,
                    spawn: true,
                    interval: 5007
                },
                files: ['build/css/*.css']
            },
            js: {
                options: {
                    livereload: true,
                    interval: 5007
                },
                files: ['js/*.js']
            }
        }

    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-combine-media-queries');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['sass', 'cmq', 'postcss:autoprefixer', 'cssmin']);
    grunt.registerTask('buildcss', ['sass', 'cmq', 'postcss:autoprefixer', 'cssmin']);

}
