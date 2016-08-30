const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const plugins = require('gulp-load-plugins')();
const react = require('gulp-react');
const browserify = require('browserify');
//const watchify = require('watchify');
const reactify = require('reactify');
const source = require('vinyl-source-stream');
const glob = require('glob');
const es = require('event-stream');
const Engine = require('velocity').Engine;
const parser = require('velocity').parser;
const Data = require('velocity').Data;
const browserSync = require('browser-sync').create();
const reload      = browserSync.reload;
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');


const config = {
  'dist': path.join(__dirname, 'dist'),
  'src': path.join(__dirname, 'src'),
  'asset': path.join(__dirname, 'asset'),
};

gulp.task('velocity', function (callback) {
  // if(!fs.existsSync(config.test)) {
  //   fs.mkdirSync(config.test);
  // }
  fs.readdir(path.join(config.src,'templates'), function (err, list) {
    list.filter(function (item) {
      return item.substr(-5) === '.html';
    }).forEach(function (item) {
      var file = item.substr(0, item.indexOf('.html'));
      var context = fs.readFileSync(path.join(__dirname, 'data/tmplJson/' + file + '.json'), {
        encoding: 'utf8'
      });
      var engine = new Engine({
        root:path.join(__dirname,''),
        template:path.join(config.src, 'templates/'+file+'.html'),
        output:path.join(config.dist,file+'.html')
      });
      console.log(engine)
      var result = '';

      try {
        result = engine.render(JSON.parse(context));
      } catch (err) {
        plugins.util.log('Velocity Render Error!', err.message)
      }
      // var data = new Data({
      //   template: path.join(config.app, 'templates/' + file + '.html')
      // });
      // var dataStructure = data.extract({});
      // fs.writeFile(path.join(config.app, 'structures/' + file + '.json'), JSON.stringify(dataStructure), {
      //   encoding: 'utf8'
      // });
    });
    callback();
  });
});

gulp.task('server',['pacjs','sass','velocity'],function () {
  browserSync.init({
    port: 9000,
    startPath: '/?debug',
    server: {
      baseDir: './dist/'
    }
  })
  gulp.watch(path.join(config.dist, '*.html')).on('change',reload);
});

gulp.task('pacjs', function(done) {
    glob(path.join(config.src,"js/*js"), function(err, files) {
        if(err) done(err);
        var tasks = files.map(function(entry) {
            return  browserify([entry])
    				      .transform(reactify)
                	.bundle()
                	.pipe(source(entry))
                	.pipe(plugins.rename({dirname:""})) //移除原目录结构
                	.pipe(gulp.dest(path.join(config.dist,"js")));
            });
        es.merge(tasks).on('end', done)
        .pipe(reload({stream: true}));
    })
});

gulp.task('sass', function () {
    var processors = [
        autoprefixer,
        cssnano
    ];
    return gulp.src(path.join(config.src,'styles','/**[!mod]/*.scss'),{base:config.src})
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.postcss(processors))
        .pipe(gulp.dest(path.join(config.dist)))//config.dist 替换gulp.src中的base
        .pipe(reload({stream: true}));
});

gulp.task('copy:assetjs',function(){
	gulp.src(path.join(config.asset,"/**/*js"))
	.pipe(gulp.dest(path.join(config.dist,'asset')))
})
gulp.task('copy:assetfont',function(){
  gulp.src(path.join(config.asset,"font/*"))
  .pipe(gulp.dest(path.join(config.dist,'asset/font')))
})
gulp.task('default',['copy:assetjs','server'],function () {
  //gulp.watch('src/styles/**/*.scss', ['sass']);
  //gulp.watch('src/snippets/**/*.html', ['tmpl2js']);
  gulp.watch(path.join(config.src, 'templates/*.html'),['velocity']);
  gulp.watch(path.join(config.src, 'js/*.js'),['pacjs']);
  gulp.watch(path.join(config.src, 'jsx/**/*.js'),['pacjs']);
  gulp.watch(path.join(config.src, 'styles/**/*.scss'),['sass']);
});