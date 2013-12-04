module.exports = function(grunt) {
  grunt.initConfig({
    src: {
      js: ['src/**/*.js'],
      css: ['src/**/*.css'],
      tpl: ['src/**/*.tpl.html'],
      unittests: ['test/unit/**/*.js']
    },
    templateOutput: 'templates/main.js',

    html2js: {
      main: {
        options: {
          rename: function (moduleName) {
            return '/client/src/' + moduleName;
          }
        },
        src: ['<%= src.tpl %>'],
        dest: '<%= templateOutput %>',
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
        maxlen: 80
      },
      src: {
        files: ['<%= src.js %>', '<%= src.unittests %>']
      }
    },

    karma: {
      unit: {
        configFile: 'test/config/unit.js',
        background: true
      }
    },

    watch: {
      js: {
        files: ['<%= src.js %>', '<%= src.unittests %>'],
        tasks: ['jshint', 'karma:unit:run'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['<%= src.css %>'],
        options: {
          livereload: true
        }
      },
      templates: {
        files: ['<%= src.tpl %>'],
        tasks: ['html2js']
      },
      templateOutput: {
        files: ['<%= templateOutput %>', 'src/index.html'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html2js');

  grunt.registerTask('default', ['karma:unit:start', 'watch']);
};
