var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open = require('open');

var app = {
    srcPath:'src/',
    devPath:'build/',
    prdPath:'dist/'
}

// 拷贝文件
gulp.task('lib',function() {
    gulp.src('bower_components/**/*.js')
    .pipe(gulp.dest(app.devPath + 'vendor'))
    .pipe(gulp.dest(app.prdPath + 'vendor'))
    .pipe($.connect.reload()) //通知服务器刷新
})

// 拷贝 html
gulp.task('html',function() {
    gulp.src(app.srcPath + '**/*.html')
    .pipe(gulp.dest(app.devPath))
    .pipe(gulp.dest(app.prdPath))
    .pipe($.connect.reload())
})

// 拷贝 json
gulp.task('json',function() {
    gulp.src(app.srcPath + 'data/**/*.json')
    .pipe(gulp.dest(app.devPath + 'data'))
    .pipe(gulp.dest(app.prdPath + 'data'))
    .pipe($.connect.reload())
})

// css min
gulp.task('less',function() {
    gulp.src(app.srcPath + 'style/index.less')
    .pipe($.plumber())
    .pipe($.less())
    .pipe(gulp.dest(app.devPath + 'css'))
    .pipe($.cssmin())
    .pipe(gulp.dest(app.prdPath + 'css'))
    .pipe($.connect.reload())
})

// js
gulp.task('js',function() {
    gulp.src(app.srcPath + 'script/**/*.js')
    .pipe($.plumber())
    .pipe($.concat('index.js'))
    .pipe(gulp.dest(app.devPath + 'js'))
    .pipe($.uglify())
    .pipe(gulp.dest(app.prdPath + 'js'))
    .pipe($.connect.reload())
})

// image
gulp.task('image',function() {
    gulp.src(app.srcPath + 'image/**/*')
    .pipe(gulp.dest(app.devPath + 'image'))
    .pipe($.imagemin())
    .pipe(gulp.dest(app.prdPath + 'image'))
    .pipe($.connect.reload())
})

// clean
gulp.task('clean',function() {
    gulp.src([app.devPath,app.prdPath])
    .pipe($.clean())
})

// build
gulp.task('build',['lib','html','less','js','json','image'])

// server
gulp.task('server',['build'],function() {
    $.connect.server({
        root:[app.devPath],
        livereload:true,
        port:1234
    })
    open('http://localhost:1234'); //打开浏览器

    gulp.watch('bower_components/**/*',['lib']); //监听变化
    gulp.watch(app.srcPath + '**/*.html',['html']);
    gulp.watch(app.srcPath + 'data/**/*.json',['json']);
    gulp.watch(app.srcPath + 'style/**/*.less',['less']);
    gulp.watch(app.srcPath + 'script/**/*.js',['js']);
    gulp.watch(app.srcPath + 'image/**/*',['image']);
})

// default
gulp.task('default',['server']);