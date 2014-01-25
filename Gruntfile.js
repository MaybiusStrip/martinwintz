module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    copy: {
      all: {
        files: [
          { src: 'site/index.html', dest: '_site/' },
          { src: 'site/images/', dest: '_site/images/' },
        ]
      }
    }

  });



};

