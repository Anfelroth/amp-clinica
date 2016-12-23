var  gulp = require('gulp');
     concat= require('gulp-concat');
     conn = require('gulp-connect');
     clean=require('gulp-clean-css');
     htmlreplace = require('gulp-html-replace');

const AMP_PATH = './public/assets/build/';
const SOURCE_JS= {
  'TETHER': './public/assets/tether/tether.min.js',
  'BOOTSTRAP': './public/assets/bootstrap/js/bootstrap.min.js',
  'SMOOTHSCROLL' : './public/assets/smooth-scroll/SmoothScroll.js',
  'VIEWPORT': './public/assets/viewportChecker/jquery.viewportchecker.js'
  }
	
const SOURCE_CSS ={
  'FONTS': './public/assets/fonts/fonts.css',
  'MATERIAL': './public/assets/bootstrap-material-design-font/css/material.css',
  'TETHER': './public/assets/tether/tether.css', 
  'BOOTSTRAP': './public/assets/bootstrap/css/bootstrap.min.css',
  'ANIMATE': './public/assets/animate.css/animate.min.css',
  'STYLE': './public/assets/theme/css/style.css',
  'MBR': './public/assets/mobirise/css/mbr-additional.css',
  'RESPONSIVE':'./public/assets/theme/css/responsive.css'
}  

//Tarea Ambiente Dev
gulp.task('connectDev', function () {
  conn.server({    
    name: 'Dev App',
    port: 8000,
    root:'./public',
    livereload: false
  });
 });

// Tarea Ambiente Prod
gulp.task('connectProd', function () {
  conn.server({
    name: 'Prod App',
    port: 9000,
    root:'./public/assets/build/build.html',
    livereload: false
  });
 });

//Concatenar js
gulp.task ('concatenar-js', function() {
  return gulp.src([SOURCE_JS.TETHER,SOURCE_JS.BOOTSTRAP,SOURCE_JS.SMOOTHSCROLL,SOURCE_JS.VIEWPORT])
          .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./public/assets/theme/js'))             
});

gulp.task ('concatenar-css', function() {
  return gulp.src([SOURCE_CSS.FONTS,SOURCE_CSS.MATERIAL,SOURCE_CSS.TETHER,SOURCE_CSS.BOOTSTRAP,SOURCE_CSS.ANIMATE,SOURCE_CSS.STYLE,SOURCE_CSS.MBR,SOURCE_CSS.RESPONSIVE])
          .pipe(concat('bundle.css')).pipe(clean({compatibility: 'ie8'}))
        .pipe(gulp.dest('./public/assets/fonts'))
                     
});

gulp.task('inline-css', function() 
{
  return gulp.src('./public/index.html')
    .pipe(htmlreplace({
      'cssInline': {
        'src': gulp.src('./public/assets/fonts/bundle.css').pipe(clean()),
        'tpl': '<style amp-custom>%s</style>'

     }
    }))
    .pipe(gulp.dest('./public/'));
});

    gulp.task('default', ['connectDev','connectProd','concatenar-js','concatenar-css','inline-css']);




