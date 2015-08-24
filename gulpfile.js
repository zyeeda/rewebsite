var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var livereload = require('gulp-livereload')

gulp.task('default', function () {
	// listen for changes
  livereload.listen()

  nodemon().on('readable', function () {
    this.stdout.on('data', function (chunk) {
      process.stdout.write(chunk)
      if (/server listening on port/.test(chunk)) {
        livereload.reload()
      }
    })

    this.stderr.on('data', function (chunk) {
      process.stderr.write(chunk)
    })
  })
})
