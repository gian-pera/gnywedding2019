module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      default: {
        src: ['./build']
      }
    },
    copy: {
      default: {
        files: [
          {
            expand: true,
            cwd: './src/main/resources',
            src: '**',
            dest: './build/resources'
          },
          {
            expand: true,
            cwd: './src/main/views',
            src: '**',
            dest: './build/views'
          }

        ]
      }
    },
    ts: {
      default: {
        files: [{
          src: './src/main/**/*.ts',
          dest: './build'
        }],
       tsconfig: true
      }
    },
    watch: {
      scripts: {
        files: ['./src/main/resources/**/*', './src/main/views/**/*'],
        tasks: 'copy',
        options: {
          interrupt: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['clean', 'copy', 'ts', 'watch']);
};
