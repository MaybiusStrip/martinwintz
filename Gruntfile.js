module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    nodemon: {
      dev: {
        script: 'server.js'
      },
    options: {
      watch: 'stylesheet'
    }
    },

    clean: {
      all: {
        src: '_site'
      },
      html: {
        src: '_site/index.html'
      },
      css: {
        src: '_site/**/*.css'
      },
      js: {
        src: '_site/**/*.js'
      }
    },

    copy: {
      all: {
        files: [
          { src: 'site/index.html', dest: '_site/index.html' },
          { expand: true, cwd: 'site/images/', src: '**/*', dest: '_site/images/' },
        ]
      },
      html: {
        files: [
          { src: 'site/index.html', dest: '_site/index.html' }
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
      html: {
        files: ['site/**/*.html'],
        tasks: ['clean:html', 'copy:html']
      },
      less: {
        files: ['site/**/*.less'],
        tasks: ['clean:css', 'less:all']
      },
      js: {
        files: ['site/**/*.js'],
        tasks: ['clean:js', 'uglify:all']
      }
    },

    uglify: {
      all: {
        files: {
          '_site/js/main.js': ['site/js/jquery-ui.min.js', 'site/js/main.js']
        }
      }
    },

    concurrent: {
      build: ['copy:all', 'less:all', 'uglify:all'],
      dev: {
        tasks: ['watch:html', 'watch:less', 'watch:js', 'nodemon:dev'],
        options: {
          logConcurrentOutput: true
        }
      },
    }


  });


  grunt.registerTask('default', ['clean:all', 'concurrent:build', 'concurrent:dev']);


};

