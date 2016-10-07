var gulp 			= require('gulp'),
	watch 				= require('gulp-watch'),
	sass 				= require('gulp-sass'),
	pug					= require('gulp-pug'),
	babel 				= require("gulp-babel"),
	browserSync 		= require('browser-sync'),
	postcss 			= require('gulp-postcss'),
		autoprefixer 		= require('autoprefixer'),
		flexFixes 			= require('postcss-flexbugs-fixes'),
	csscomb 			= require('gulp-csscomb'),
	cleanCSS 			= require('gulp-clean-css'),
	rename				= require('gulp-rename'),
	plumber 			= require('gulp-plumber'),
	concat 				= require('gulp-concat'),
	uglify 				= require('gulp-uglify'),
	imagemin 			= require('gulp-imagemin'),
	imageminPngquant	= require('imagemin-pngquant'),
	svgSprite			= require('gulp-svg-sprite'),
	cheerio				= require('gulp-cheerio'),
	clean 				= require('gulp-clean'),
	runSequence 		= require('run-sequence');

// HTML
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
gulp.task('html', function()
{
	return gulp.src(['src/pug/index.pug'])
			.pipe(plumber())
			.pipe(pug({
				pretty: "	"
			}))
			.pipe(gulp.dest('dist'))
			.pipe(browserSync.stream());
});

// CSS
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
gulp.task('css', function()
{
	return gulp.src('src/sass/main.scss')
				.pipe(sass().on('error', sass.logError))
				.pipe(postcss([
					autoprefixer({browsers: ['last 20 versions']}),
					flexFixes(),
				]))
				.pipe(csscomb())
				.pipe(rename({
					basename: "main",
					extname: ".css"
				}))
				.pipe(gulp.dest('dist/css'))
				.pipe(browserSync.stream());
});

gulp.task('css_min', function()
{
	return gulp.src('dist/css/main.css')
			.pipe(cleanCSS({compatibility: 'ie8'}))
			.pipe(rename({
				suffix: ".min"
			}))
			.pipe(gulp.dest('dist/css'));
});

// Images
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
gulp.task('img_sprite_1', function()
{
	 // Remove internal styles
	return gulp.src('src/img/icons/*.svg')
			.pipe(cheerio({
				run: function($) {
					$('[fill]').removeAttr('fill');
					$('[stroke]').removeAttr('stroke');
					$('[style]').removeAttr('style');
				},
				parserOptions: {xmlMode: true}
			}))
			.pipe(gulp.dest('dist/img/icons'));	
});

gulp.task('img_sprite', ["img_sprite_1"], function()
{
	return gulp.src([
				'src/img/icons/static/*.svg',
				'dist/img/icons/*.svg',
			])
			.pipe(svgSprite({
				mode: {
					symbol: {
						dest: './',
						sprite: './sprite.svg',
						bust: false,
						render: {
							scss: true
						}
					}
				},
				svg: {
					xmlDeclaration: false,
					doctypeDeclaration: false
				}
			}))
			.pipe(gulp.dest('dist/img'));
});

gulp.task('img', ["img_sprite"], function()
{
	// Move the rest NON-sprite images to dist folder
	return gulp.src([
				'src/img/*.*',
				'!src/img/icons',
			])
			.pipe(gulp.dest('dist/img'))
			.pipe(browserSync.stream());
});

gulp.task('img_min', function()
{
	return gulp.src('dist/img/*.{jpg,png}')
			.pipe(imagemin({
				progressive: true, // JPG
				use: [imageminPngquant()] // PNG
			}))
			.pipe(gulp.dest('dist/img'));
});

// JavaScript
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
gulp.task('jsLibs', function()
{
	return gulp.src([
				'src/libs/jquery/dist/jquery.min.js',
				'src/libs/svg4everybody/dist/svg4everybody.min.js',
			])
			.pipe(plumber())
			.pipe(concat('libs.js'))
			.pipe(gulp.dest('dist/js'));
});

gulp.task('jsCustom', ["jsLibs"], function()
{
	return gulp.src([
				'src/js/*.js',
			])
			.pipe(plumber())
			.pipe(babel({
				presets: ['es2015']
			}))
			.pipe(concat('custom.js'))
			.pipe(gulp.dest('dist/js'));
});

gulp.task('js', ["jsCustom"], function()
{
	return gulp.src([
				'dist/js/libs.js',
				'dist/js/custom.js',
			])
			.pipe(plumber())
			.pipe(concat('main.js'))
			.pipe(gulp.dest('dist/js'))
			.pipe(browserSync.stream());
});

gulp.task('js_min', function()
{
	return gulp.src([
				'dist/js/main.js'
			])
			.pipe(uglify())
			.pipe(rename({
				suffix: ".min"
			}))
			.pipe(gulp.dest('dist/js'));	
});

// Misc
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
gulp.task("watch", ["watch_before"], function()
{
	gulp.watch([
		"src/sass/**/*.+(scss|css)",
		"src/libs/bootstrap/scss/**/*.scss",
	],["css"]);
	gulp.watch("src/pug/**/*.pug",["html"]);
	gulp.watch("src/img/**/*.*",["img"]);
	gulp.watch("src/js/**/*.*",["js"]);
	browserSync.init({server: "dist"});
});

gulp.task('watch_before', function(callback) {
	runSequence(
		'html',
		'css',
		'img',
		'js',
		callback);
});

// Build
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
gulp.task('build_before', function()
{
	return gulp.src('dist/*', {read: false})
		.pipe(clean());
});

gulp.task('build_after', function()
{
	// Remove unwanted files
	gulp.src([
			'dist/img/icons',
			'dist/img/sprite.scss',
			'dist/css/main.css',
			'dist/js/main.js',
			'dist/js/libs.js',
			'dist/js/custom.js',
		], {read: false})
		.pipe(clean());

	// Move custom files to dist folder
	return gulp.src([
				// "",
			])
			.pipe(gulp.dest("dist/"));
});

gulp.task('build', function(callback) {
	runSequence(
		'build_before',
		'html',
		'css',
		'css_min',
		'img',
		'img_min',
		'js',
		'js_min',
		'build_after',
		callback);
});
