const gulp = require('gulp');
//import babel from 'gulp-babel';
const concat = require('gulp-concat');
//import uglify from 'gulp-uglify';
const cleanCSS = require('gulp-clean-css');
const purgecss = require('gulp-purgecss')
const del = require('del');


var postcss = require('gulp-postcss');

const paths = {
    root: {
        src: './src/index.js',
        dest: './dist/index.js'
    },
    plugin: {
        html: {
            src: './src/plugin/index.html',
            dest: './dist/plugin/index.html'
        },
        css: {
            src: './src/plugin/**/*.css',
            dest: './dist/plugin/'
        },
        js: {
            src: './src/plugin/index.js',
            dest: './dist/plugin/index.js'
        }
    }
}

function clean() {
    return del(['dist']);
}

/*export function rootJS() {
    return gulp.src(paths.root.src);
}

export function js() {
    return gulp.src(paths.plugin.js.src)
}*/

function css(){
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
};

function watch() {
    gulp.watch(paths.plugin.css.src, css);
}

const build = gulp.parallel(clean, css);

exports.css = css;
exports.watch = watch;
exports.default = build;