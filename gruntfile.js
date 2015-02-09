module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['app/scripts/*.js'],
      options: {
        reporter: require('jshint-stylish'),
        jshintrc: true
      }
    },

    jasmine: {
      app : {
        src: 'app/scripts/*.js',
        options: {
          specs: 'test/js/spec.*.js'
        }
      }
    },

    uglify: {
      main: {
        options: {
          beautify: false
        },
        files: {
          'app/build/js/main.min.js': 'app/build/js/main.js'
        }
      }
    },

    concat: {
      dist: {
        src: ['app/vendor/jQuery/dist/jquery.min.js', 'app/scripts/app.js'],
        dest: 'app/build/js/main.js'
      }
    },

    watch: {
      options: {
        interrupt: true,
        spawn: false
      },
      css: {
        files: ['app/styles/**/*.scss'],
        tasks: ['sass']
      },
      js: {
        files: ['app/scripts/**/*.js'],
        tasks: ['jshint', 'concat', 'uglify']
      },
      img: {
        files: ['app/images/**/*.{png,jpg,gif}'],
        tasks: ['imagemin']
      },
      grunt: {
        options: {
          reload: true
        },
        files: ['gruntfile.js']
      }
    },

    sass: {
      options: {
        style: 'nested',
        sourceMap: true
      },
      dist: {
        files: {
          'app/build/css/style.css' : 'app/styles/style.scss'
        }
      }
    },

    connect: {
      server: {
        options: {
          hostname: '127.0.0.1',
          port: 8888,
          base: 'app',
          keepalive: false
        }
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'app/images',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'app/build/images'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  
  grunt.registerTask('default', ['connect:server', 'watch']);
  grunt.registerTask('test', ['jasmine']);

};
