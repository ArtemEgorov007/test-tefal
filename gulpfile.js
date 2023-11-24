const gulp = require("gulp");
const clean = require("gulp-clean");
const sass = require("gulp-sass")(require("sass"));
const imagemin = require("gulp-imagemin");
const server = require("gulp-server-livereload");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const pump = require("pump");

// Tasks
require("./gulp/dev.js");
require("./gulp/docs.js");

// Clean task
gulp.task("clean:build", function () {
	return gulp.src("dist", { read: false, allowEmpty: true }).pipe(clean());
});

// HTML task for build
gulp.task("html:build", function () {
	// Add your HTML build logic here
	// For example:
	return gulp.src("src/*.html").pipe(gulp.dest("dist"));
});

// Sass task for build
gulp.task("sass:build", function () {
	// Add your Sass build logic here
	// For example:
	return gulp
		.src("src/scss/*.scss")
		.pipe(sass({ outputStyle: "compressed" }))
		.pipe(gulp.dest("dist/css"));
});

// Images task for build
gulp.task("images:build", function () {
	// Add your image build logic here
	// For example:
	return gulp.src("src/images/**/*").pipe(imagemin()).pipe(gulp.dest("dist/images"));
});

// Fonts task for build
gulp.task("fonts:build", function () {
	// Add your font build logic here
	// For example:
	return gulp.src("src/fonts/**/*").pipe(gulp.dest("dist/fonts"));
});

// Files task for build
gulp.task("files:build", function () {
	// Add your file build logic here
	// For example:
	return gulp.src("src/files/**/*").pipe(gulp.dest("dist/files"));
});

// JS task for build
gulp.task("js:build", function (cb) {
	// Add your JS build logic here
	// For example:
	pump([gulp.src("src/js/*.js"), concat("main.js"), uglify(), gulp.dest("dist/js")], cb);
});

// Build task
gulp.task("build", gulp.series("clean:build", gulp.parallel("html:build", "sass:build", "images:build", "fonts:build", "files:build", "js:build")));

// Default task
gulp.task(
	"default",
	gulp.series("clean:dev", gulp.parallel("html:dev", "sass:dev", "images:dev", "fonts:dev", "files:dev", "js:dev"), gulp.parallel("server:dev", "watch:dev"))
);

// Docs task
gulp.task("docs", gulp.series("clean:docs", gulp.parallel("html:docs", "sass:docs", "images:docs", "fonts:docs", "files:docs", "js:docs"), gulp.parallel("server:docs")));
