/**
 * NPM Dependencies
 */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css')
    flatten = require('gulp-flatten')
    watch = require('gulp-watch')
    fs = require('fs'),
    yaml = require('js-yaml');

// -------------------------------------------------------------------------

/**
* * Define Configuration object
* */
var config = yaml.load(fs.readFileSync('gulp_config.yaml', 'utf-8'));

// -------------------------------------------------------------------------

gulp.task('css', function() {
    gulp.src(config.src.css)
        .pipe(minifyCss())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest(config.dest.css));
});

// -------------------------------------------------------------------------

gulp.task('js', function() {
    gulp.src(config.src.js)
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(config.dest.js));
});

// -------------------------------------------------------------------------

/**
 * Compile Third Party Dependencies
 */
gulp.task('dependencies', function() {

    // Combine JS Files
    gulp.src(config.third_party.js)
        .pipe(uglify())
        .pipe(concat('dependencies.min.js'))
        .pipe(gulp.dest(config.dest.js));

    // Combine CSS Files
    gulp.src(config.third_party.css)
        .pipe(minifyCss())
        .pipe(concat('dependencies.min.css'))
        .pipe(gulp.dest(config.dest.css));

    // Flatten fonts
        gulp.src(config.third_party.fonts)
        .pipe(flatten())
        .pipe(gulp.dest(config.dest.fonts));
});

// -------------------------------------------------------------------------

/**
* * Create Watch Scripts
* */
gulp.task('watch', function () {
    watch(config.src.css, ['css']);
});

// -------------------------------------------------------------------------

/**
 * * Default task
 * */
gulp.task('default', [
    'js',
    'css',
    'dependencies',
    'watch'
]);

// -------------------------------------------------------------------------

