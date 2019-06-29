var gulp = require("gulp"),
  autoprefixer = require("gulp-autoprefixer"),
  browsersync = require("browser-sync").create(),
  pug = require("gulp-pug"),
  sass = require("gulp-sass");

gulp.task("sass", () => {
  gulp
    .src("./scss/*.scss")
    .pipe(
      sass({
        outputStyle: "expanded" //expande los extilos dentro del archivo style.css
      })
    )
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(gulp.dest("./css"))
    .pipe(browsersync.stream());
});

//creamos un servidor
gulp.task("serve", () => {
  browsersync.init({
    server: "./"
  });
  gulp.watch("./scss/*.scss").on("change", gulp.series("sass"));
  gulp.watch("./*.html").on("change", browsersync.reload);
});

gulp.task("default", gulp.series("serve"));
