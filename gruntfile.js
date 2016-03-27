"use strict";

module.exports = function(grunt) {

  // Load grunt tasks
  require('load-grunt-tasks')(grunt);

  // Grunt configuration
  grunt.initConfig({
    copy: {
      main: {
        expand: true,
        cwd: 'src/fonts/',
        src: '**',
        dest: 'dist/fonts/'
      }
    },
    bowercopy: {
      options: {
        srcPrefix: 'bower_components'
      },
      js: {
        options: {
          destPrefix: 'src/jasmine/lib'
        },
        files: {
          'jquery.js': 'jquery/dist/jquery.js',
          'jasmine-jquery.js': 'jasmine-jquery/lib/jasmine-jquery.js'
        }
      }
    },
    htmlmin: {
      target: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.html'],
            dest: 'dist/',
            ext: '.html'
          }
        ]
      }
    },
    cssmin: {
      options: {
        roundingPrecision: 2
      },
      target: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.css'],
            dest: 'dist/',
            ext: '.css'
          }
        ]
      }
    },
    uglify: {
      options: {
        mangle: true
      },
      target: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.js'],
            dest: 'dist/',
            ext: '.js'
          }
        ]
      }
    }
  });

  // Register default tasks
  grunt.registerTask('default', ['copy','bowercopy','newer:htmlmin','newer:cssmin','newer:uglify']);
};
