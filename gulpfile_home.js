let gulp = require("gulp");

let app = {
    src: "./node_modules/bootstrap",
    dist: "./node_modules/bootstrap/dist",
    js: [
         './node_modules/bootstrap/js/transition.js',
          './node_modules/bootstrap/js/alert.js',
          './node_modules/bootstrap/js/button.js',
          './node_modules/bootstrap/js/carousel.js',
          './node_modules/bootstrap/js/collapse.js',
          './node_modules/bootstrap/js/dropdown.js',
          './node_modules/bootstrap/js/modal.js',
          './node_modules/bootstrap/js/tooltip.js',
          './node_modules/bootstrap/js/popover.js',
          './node_modules/bootstrap/js/scrollspy.js',
          './node_modules/bootstrap/js/tab.js',
          './node_modules/bootstrap/js/affix.js'
    ]
}

gulp.task("copy", function(done) {
    // gulp.src(app.src)               // 只会拷贝src目录
    // gulp.src(app.src + "/*")            // 只会拷贝src目录下的一级内容（子文件夹内容没有，src目录没有创建）
    // gulp.src(app.src + "/**")            // 会拷贝src目录下的所有内容（src目录没有创建）

    gulp.src(app.src+"/fonts")
        .pipe(gulp.dest(app.dist));
    gulp.src(app.src + "/fonts/**")
        .pipe(gulp.dest(app.dist + "/fonts"));

    done();
});
// js压缩混淆
// npm i gulp-uglify-es --save-dev

let jsmin = require("gulp-uglify-es");
let concat = require("gulp-concat");
let rename = require("gulp-rename");
let { default: uglify } = require("gulp-uglify-es");

gulp.task("js", function(done) {
    gulp.src(app.js)
        .pipe(concat("bootstrap.js"))
        .pipe(uglify())
        .pipe(rename("bootstrap.min.js"))
        .pipe(gulp.dest(`${app.dist}/js`));

    done();
});


let less = require("gulp-less");

// 将src/less/*.less编译到dist/css/*.css
gulp.task("less",function(done){
   
    gulp.src(`${app.src}/less/bootstrap.less`)
        .pipe(less())
       
        .pipe(gulp.dest(app.dist + "/css"));

    done();
})
<div></div>