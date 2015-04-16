var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    spawn = require('child_process').spawn;
    processes = [];

function handleError(err) {
    console.log(err.toString());
}

function shutdown() {
    console.log('Killing processes...');
    processes.forEach(function(proc) {
        process.kill(proc.pid);
    });
    process.kill(process.pid);
    console.log('Done!');
}

function runCommand(command, showOutput) {
  return function () {
    var args = command.split(' ');
    if (showOutput) {
        return processes.push(spawn(args.shift(), args, { stdio: 'inherit' }));
    } else {
        return processes.push(spawn(args.shift(), args));
    }
  }
}

gulp.task('env:test', function() {
    console.log('Setting environment to test.');
    process.env.NODE_ENV = 'test';
});

gulp.task('run-tests', ['start-mongo'], function() {
    gulp.src(['app/test/*.test.js'], { read: false })
        .pipe(mocha({
            reporter: 'spec',
            timeout: 5000
        }))
        .on('error', handleError)
        .on('end', shutdown);
});

gulp.task('start-mongo', runCommand('mongod --dbpath .db'));
gulp.task('start-server', runCommand('nodemon --watch app/ server.js', true));
gulp.task('test', ['env:test', 'start-mongo', 'run-tests']);

gulp.task('default', ['start-mongo', 'start-server']);