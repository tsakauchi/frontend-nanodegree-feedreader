"use strict";

module.exports = function(grunt) {

  // Load grunt tasks
  require('load-grunt-tasks')(grunt);

  // Grunt configuration
  grunt.initConfig({
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
    }
  });

  // Register default tasks
  grunt.registerTask('default', ['bowercopy']);
};
