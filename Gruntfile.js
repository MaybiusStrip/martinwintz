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
    },

    less: {
      options: {
        cleancss: true
      },
      all: {
        files: { '_site/stylesheets/main.css': 'site/stylesheets/main.less' }
      }
    },

    watch: {
      all: {
        files: ['site/**/*.*'],
        tasks: ['dev']
      }
    }

  });


  grunt.registerTask('dev', ['copy:all', 'less:all', 'nodemon:dev']);
  grunt.registerTask('default', ['dev', 'watch:all']);


};

