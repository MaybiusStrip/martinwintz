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
          { expand: true, cwd: 'site/writing/', src: '**/*', dest: '_site/writing/' },
          { src: 'site/CNAME', dest: '_site/CNAME' },
          { expand: true, cwd: 'site/images/', src: '**/*', dest: '_site/images/' },
        ]
      },
      html: {
        files: [
          { src: 'site/index.html', dest: '_site/index.html' },
          { expand: true, cwd: 'site/writing/', src: '**/*', dest: '_site/writing/' },
        ]
      }
    },

    less: {
      options: {
        cleancss: true
      },
      home: {
        files: { '_site/stylesheets/home.css': 'site/stylesheets/home.less' }
      },
      writing: {
        files: { '_site/stylesheets/writing.css': 'site/stylesheets/writing.less' }
      }
    },

    watch: {
      html: {
        files: ['site/**/*.html'],
        tasks: ['clean:html', 'copy:html']
      },
      less: {
        files: ['site/**/*.less'],
        tasks: ['clean:css', 'less:home', 'less:writing']
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
      build: ['copy:all', 'less:home', 'less:writing', 'uglify:all'],
      dev: {
        tasks: ['watch:html', 'watch:less', 'watch:js', 'nodemon:dev'],
        options: {
          logConcurrentOutput: true
        }
      },
    },

    'gh-pages': {
      options: {
        base: '_site',
        branch: 'master',
        repo: 'git@github.com:MaybiusStrip/MaybiusStrip.github.io.git'
      },
      src: '**/*'
    }


  });


  grunt.registerTask('default', ['clean:all', 'concurrent:build', 'concurrent:dev']);
  grunt.registerTask('deploy', ['clean:all', 'concurrent:build', 'gh-pages']);


};

