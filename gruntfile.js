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
          'js/build/build.js': [
            'dependencies/jQuery/dist/jquery.js',
            'js/app.js'
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
          'js/build/build.min.js': 'js/build/build.js'
        }
      }
    },

    watch: {
      options: {
        interrupt: true,
        spawn: false
      },
      css: {
        files: ['scss/**/*.scss'],
        tasks: ['sass']
      },
      js: {
        files: ['js/**/*.js'],
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
          'css/style.css' : 'scss/style.scss'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  
  grunt.registerTask('default', ['watch']);

  grunt.registerMultiTask('build', function() {
    grunt.task.run(this.data);
  });
};
