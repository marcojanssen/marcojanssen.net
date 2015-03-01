module.exports = function (grunt) {
    'use strict';
    // Project configuration
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),

        // Task configuration
        bower_concat: {
            all: {
                dest: 'build/js/_bower.js',
                cssDest: 'build/css/_bower.css',
                bowerOptions: {
                    relative: false
                },
                exclude: [
                    'jquery',
                    'bootstrap'
                ]
            }
        },
        concat: {
            options: {
                stripBanners: false
            },
            css: {
                src: [
                    'css/*.css',
                    'css/**/*.css'
                ],
                dest: 'build/css/concat.css'
            }
        },
        uglify: {
            options: {
                stripBanners: false
            },
            concat: {
                src: [
                    '<%= bower_concat.all.dest %>'
                ],
                dest: 'static/js/minified.js'
            }
        },
        cssmin: {
            concat:{
                src: [
                    '<%= bower_concat.all.cssDest %>',
                    '<%= concat.css.dest %>'
                ],
                dest: 'static/css/minified.css'
            }
        },
        jshint: {
            options: {
                node: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                eqnull: true,
                browser: true,
                globals: { jQuery: true },
                boss: true
            },
            gruntfile: {
                src: 'gruntfile.js'
            },
            lib_test: {
                src: ['lib/**/*.js']
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib_test: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['jshint:lib_test']
            },
            minify: {
                files: [
                    'css/*.css',
                    'css/**/*.css'
                ],
                tasks: ['default']
            }
        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task
    grunt.registerTask('default', ['jshint', 'bower_concat', 'concat', 'uglify', 'cssmin']);
};

