//引入gulp工具
const gulp=require('gulp'),
      htmlmin=require('gulp-htmlmin'),
      sass=require('gulp-sass'),
      cleanCss=require('gulp-clean-css'),
      connect=require('gulp-connect'),
      babel=require('gulp-babel'),
      uglify=require('gulp-uglify')

//制定一个压缩html任务
gulp.task('html',()=>{
  // src是去读取文件，gulp读取文件的方式是文件流
  // 通过pipe管道的方式去压缩html
  // 最后把压缩的结果放到dist目录里
  // **代表所有目录，*代表所有文件
  gulp.src('src/**/*.html')
  .pipe(htmlmin({
    removeComments: true,// 清除HTML注释
    collapseWhitespace: true,// 压缩HTML
    collapseBooleanAttributes: true,// 省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true,// 删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,// 删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,// 删除<style>和<link>的type="text/css"
    minifyJS: true,// 压缩页面JS
    minifyCSS: true// 压缩页面CSS 
  }))
  .pipe(gulp.dest('dist'))
  .pipe(connect.reload())
})

//编译scss
gulp.task('css',()=>{
    gulp.src('src/css/**/*.scss')
    .pipe(sass())
    .pipe(cleanCss())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
})

//开启服务器
gulp.task('server',()=>{
    connect.server({
        root:'dist',//服务器的根路径
        livereload:true,//自动刷新
        port:2333
    })
})

//只需要移动的资源
gulp.task('move',()=>{
    gulp.src('src/libs/**/*')
    .pipe(gulp.dest('dist/libs'))

    gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images'))
})

//js任务
gulp.task('js',()=>{
    gulp.src('src/js/**/*.js')
    .pipe(babel({
        presets:['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload())
})

//监听
gulp.task('watch',()=>{
    // 第一个参数是监听改变的文件
    // 第二个参数就是这些文件修改之后要执行的任务
    gulp.watch('src/**/*.html',['html'])
    gulp.watch('src/**/*.scss',['css'])
    gulp.watch('src/**/*.js',['js'])
})

//设默认执行
gulp.task('default',['html','css','js','server','move','watch'])

