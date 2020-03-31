var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index'); //主路由
var usersRouter = require('./routes/users'); //用户路由(空)

var app = express();

// 设置视图引擎
app.set('views', path.join(__dirname, 'views')); //设置视图文件夹
app.set('view engine', 'hbs');

app.use(logger('dev'));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //设置静态资源目录

app.use(express.urlencoded({limit:'100mb', extended:true})); //解析post请求,让req.body可用

app.use('/', function(req,res,next){
	if(req.path === '/'){
		res.render('expanded-toc');
	}else{
		next();
	}
});
app.use('/', indexRouter); //添加主路由
app.use('/users', usersRouter); //添加用户路由(空)


// 404错误处理
app.use(function(req, res, next) {
  next(createError(404));
});

// 500错误处理
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 渲染错误页面
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
