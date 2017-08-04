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
            dest: './build'
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ts');
  grunt.registerTask('default', ['clean', 'copy', 'ts']);
};
