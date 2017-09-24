var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload=require('gulp-livereload');
var concat=require('gulp-concat');//concat js and css files into one
var minifyCss=require('gulp-minify-css');
var autoprefixer=require('gulp-autoprefixer');
var plumber=require('gulp-plumber');//auto reload
var sourcemaps=require('gulp-sourcemaps');//for js/css debugging
var babel=require('gulp-babel');//to render ES6 codes
// image compression
var imagemin=require('gulp-imagemin');
var imageminPngquant=require('imagemin-pngquant');
var imageminJpegRecompress=require('imagemin-jpeg-recompress');
//file path
var HTML_PATH='public/*.html'
var SCRIPTS_PATH='public/*.js';
var SCRIPTS_PATH2='public/views/*.js';
var STYLE_PATH='public/includes/css/**/*.css'
var DIST_PATH='public/dist';
var IMAGES_PATH='public/images/**/*.{png,jpeg,svg,gif}';

gulp.task('html', () => {
    console.log("working html");
     return gulp.src(HTML_PATH)
        .pipe(gulp.dest(''))
        .pipe(livereload());   
});
gulp.task('styles', () => {
    console.log("working styles");
    return gulp.src(['public/style/two.css',STYLE_PATH])
            .pipe(plumber(function(err){
                console.log("error occur==>");
                console.log(err);
                this.emit('end');
            }))
            .pipe(sourcemaps.init())
            .pipe(autoprefixer())
            .pipe(concat('style.css'))
            .pipe(minifyCss())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(DIST_PATH))
            .pipe(livereload());
   
});

gulp.task('scripts', () => {
    console.log("working scripts");
     return gulp.src([SCRIPTS_PATH,SCRIPTS_PATH2])
            .pipe(plumber(function(err){
                console.log("JS error");
                console.log(err);
                this.emit('end');
            }))
            .pipe(sourcemaps.init())
            .pipe(babel({
                presets:['es2015']
            }))
            .pipe(uglify())
            .pipe(concat('script.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(DIST_PATH))
            .pipe(livereload());
})

gulp.task('images', () => {
   return gulp.src(IMAGES_PATH)
            .pipe(imagemin(
             [
                   imagemin.gifsicle(),
                    imagemin.jpegtran(),
                    imagemin.optipng(),
                    imagemin.svgo(),
                    imageminPngquant(),
                    imageminJpegRecompress()
                ]
            ))
            .pipe(gulp.dest(DIST_PATH+'/images'));
})

gulp.task('default',['scripts','styles','html'], () => {
    console.log("working defaults");
});

gulp.task('watch',['default'], () => {

    console.log("working watch");
    livereload.listen();
    gulp.watch([SCRIPTS_PATH,SCRIPTS_PATH2],['scripts']);
    gulp.watch(STYLE_PATH,['styles']);

});