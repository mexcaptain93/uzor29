'use strict';

const
	fs = require('fs'),
	gulp = require('gulp'),
	concat = require('gulp-concat'),       // Склейка файлов
	less = require('gulp-less'),         // Плагин для less
	path = require('path'),              // Плагин для less
	autoprefixer = require('gulp-autoprefixer'), // Автопрефиксер
	browserSync = require('browser-sync'),      // BrowserSync
	rigger = require('gulp-rigger'),       // Rigger - Объединение файлов по ссылкам
	uglify = require('gulp-uglify'),       // Uglify - Минификация js
	shorthand = require('gulp-shorthand'),    // Объединение многострочного css
	svgo = require('gulp-svgo');       // Минификация SVG
//svgSprite    = require("gulp-svg-sprites");  // Спрайты


// Автообновление/сервер
gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: "build"
		}
	});

	gulp.watch("dev/html/**/*").on('change', browserSync.reload);
	gulp.watch("dev/js/**/*").on('change', browserSync.reload);
	gulp.watch("dev/less/*.less").on('change', browserSync.reload);
});
gulp.task('bs-reload', function() {
	browserSync.reload();
});

// Сборка html файлов
gulp.task('html', function() {
	gulp.src('dev/html/*.html') //Выберем файлы по нужному пути
		.pipe(rigger()) //Прогоним через rigger
		.pipe(gulp.dest('build/')); //Выплюнем их в папку build
});


// Сбор less & -> css
gulp.task('css', function() {
	gulp.src('dev/less/*.less')
		.pipe(concat('styles.less'))
		.pipe(less({
			paths: [path.join(__dirname, 'less', 'includes')]
		}))
		.pipe(autoprefixer({
			browsers: ['> 0%']
		}))

		//.pipe(shorthand())
		.pipe(gulp.dest('build/css'));
});

// min css
// gulp.task('mincss', function() {
//     return gulp.src('build/css/styles.css')
//         .pipe(csso())
//         .pipe(gulp.dest('build/css/min'));
// });

//Сбор js
gulp.task('js', function() {
	gulp.src('dev/js/**/*')
		.pipe(gulp.dest('build/js'));
});

// Сбор img
// gulp.task('image', function() {
//     gulp.src('dev/img/**/*')
//         .pipe(gulp.dest('build/img/'));
// });


//Сбор и минификация svg
gulp.task('svg', function() {
	gulp.src('dev/svg/*.svg')
		.pipe(svgo())
		.pipe(gulp.dest('build/img/svg'));
});

// Спрайты
/*var config = {
    unit : 20,
    padding : 10
}
gulp.task('sprite', function () {
    return gulp.src('dev/svg/svgsprite/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest("build/img/svg/sprite")) // Write the sprite-sheet + CSS + Preview
        .pipe(gulp.dest("build/img/svg/sprite"))
});
*/
function createFolder(name) {
	const dir = './' + name;
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
		console.log('Directory ' + name + ' is created');
	}
}

gulp.task('init', function() {
	const folders = ['build', 'build/css', 'build/img', 'build/img/svg', 'build/js', 'dev', 'dev/html', 'dev/html/includes', 'dev/js', 'dev/less', 'dev/svg'];
	folders.forEach((f) => {
		createFolder(f);
	});

});


// default
gulp.task('default', ['html', 'css', 'browser-sync', 'js'], function() {
	gulp.watch("dev/html/**/*.html", ['bs-reload', 'html']);
	gulp.watch("dev/less/*.less", ['bs-reload', 'css']);
	gulp.watch("dev/js/*.js", ['bs-reload', 'js']);
});
