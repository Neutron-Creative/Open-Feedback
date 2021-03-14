const gulp = require('gulp');
//const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const purgecss = require('gulp-purgecss')
const postcss = require('gulp-postcss');
const htmlmin = require('gulp-htmlmin');
const inlineSource = require('gulp-inline-source');
const inlineCss = require('gulp-inline-css');
const del = require('del');
const gulpPostcss = require('gulp-postcss');


const paths = {
    root: {
        src: './src/index.js',
        dest: './dist/'
    },
    bundle: {
        src: './dist/plugin/index.html',
        dest: './dist/'
    },
    plugin: {
        html: {
            src: './src/plugin/index.html',
            dest: './dist/plugin/'
        },
        css: {
            src: './src/plugin/**/*.css',
            dest: './dist/plugin/'
        },
        js: {
            src: './src/plugin/**/*.js',
            dest: './dist/plugin/'
        }
    }
}

function clean() {
    return del(['dist']);
}

function root() {
    return gulp.src(paths.root.src)
    .pipe(uglify())
    .pipe(gulp.dest(paths.root.dest))
}

function html() {
    return gulp.src(paths.plugin.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.plugin.html.dest))
}

function css() {
    return gulp.src(paths.plugin.css.src)
    .pipe(concat({path: 'index.min.css'}))
    .pipe(postcss([
        require('tailwindcss'),
        require('autoprefixer')
    ]))
    .pipe(cleanCSS())
    .pipe(purgecss({
        content: [paths.plugin.html.src]
    }))
    .pipe(gulp.dest(paths.plugin.css.dest))
}

function js() {
    return gulp.src(paths.plugin.js.src)
    .pipe(concat({path: 'index.min.js'}))
    .pipe(uglify({}))
    .pipe(gulp.dest(paths.plugin.js.dest))
}

function bundle() {
    return gulp.src(paths.bundle.src)
    .pipe(inlineCss())
    .pipe(inlineSource())
    .pipe(gulp.dest(paths.bundle.dest));
}

function watch() {
    gulp.watch(paths.plugin.html, html);
    gulp.watch(paths.plugin.css.src, css);
    gulp.watch(paths.plugin.js.src, js);
    gulp.watch(paths.root.src, root);
    gulp.watch(paths.bundle.src, bundle);
}

const build = gulp.series(clean, gulp.series(gulp.parallel( root, html, css, js), bundle));

exports.css = css;
exports.watch = watch;
exports.default = build;