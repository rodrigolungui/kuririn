module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['js/*.js'],
      options: {
        reporter: require('jshint-stylish'),
        jshintrc: true
      }
    },

    jasmine: {
      app : {
        src: 'js/*.js',
        options: {
          specs: 'test/js/spec.*.js'
        }
      }
    },

    uglify: {
      beautified: {
        options: {
          banner: '/* generated on: <%= grunt.template.today("isoDateTime") %> */',
          beautify: true,
          compress: {
            drop_console: false,
            drop_debugger: false
          },
          mangle: false,
          preserveComments: false,
          report: 'min',
          sourceMap: false
        },
        files: {
          'app/build/js/build.js': [
            'app/vendor/jQuery/dist/jquery.js',
            'app/scripts/app.js'
          ]
        }
      },

      uglified: {
        options: {
          banner: '/* generated on: <%= grunt.template.today("isoDateTime") %> */',
          beautify: false,
          compress: {
            drop_console: true,
            drop_debugger: true
          },
          mangle: true,
          preserveComments: false,
          report: 'min',
          sourceMap: true
        },
        files: {
          'app/build/js/build.min.js': 'app/build/js/build.js'
        }
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
        tasks: ['uglify']
      },
      grunt: {
        options: {
          reload: true
        },
        files: ['gruntfile.js']
      }
    },

    sass: {
      main: {
        options: {
          banner: '/* generated on: <%= grunt.template.today("isoDateTime") %> */',
          style: 'nested'
        },
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
          base: '.',
          keepalive: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  
  grunt.registerTask('default', ['connect:server', 'watch']);

};
