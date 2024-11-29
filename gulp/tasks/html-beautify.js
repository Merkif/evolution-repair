import prettyHtml from "gulp-pretty-html";

export const htmlBeautify = () => {
  return app.gulp.src(`${app.paths.base.build}/**/*.html`)
    .pipe(prettyHtml({
	  indent_with_tabs:true,
      unformatted: ['code', 'pre', 'em', 'strong', 'span', 'i', 'b', 'br']
    }))
    .pipe(app.gulp.dest(app.paths.base.build));
}
