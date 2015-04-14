var gulp = require('gulp');
var spawn = require('child_process').spawn;

function runCommand(command, showOutput) {
  return function () {
    var args = command.split(' ');
    if (showOutput) {
        spawn(args.shift(), args, { stdio: 'inherit' });
    } else {
        spawn(args.shift(), args);
    }
  }
}

gulp.task('start-mongo', runCommand('mongod --dbpath .db'));
gulp.task('start-server', runCommand('nodemon --watch app/ server.js', true));

gulp.task('default', ['start-mongo', 'start-server']);