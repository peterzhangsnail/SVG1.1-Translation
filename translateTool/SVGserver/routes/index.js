var express = require('express');
var router = express.Router();
const fs = require('fs');
const {inspect} = require('util');
const handlebars = require('handlebars');

const template = handlebars.compile(fs.readFileSync('./template.html','utf8')); //用handlebars编译模板文件template.html

//---路由区---------------------------------------------
router.get('/', function(req, res, next) { //错误页面
  res.render('error');
});


//添加/*的get和post路由:
router.get('/*',sendFile);
router.post('/*',handlePost);


//---函数定义区-----------------------------------------
function sendFile(req,res){
	console.log(`req.url is ${req.url}`);
	console.log('hello');
	let trimSlash = req.path.replace(/^\//,''); //path的结构"/path1/path2/.../×××.html",清除path字符串开头的反斜杠
	let fileName = trimSlash.replace('.html',''); //清除文件后缀名
	res.render(fileName);
}

function handlePost(req,res){
	let trimSlash = req.path.replace('/',''); //清除path字符串开头的反斜杠
	let fileName = trimSlash.replace('.html',''); //清除文件后缀名
	let spec = req.body.spec; //获取post提交的spec的内容

	let result = hbsCompile(template,spec); //用handlebars渲染文本

	fs.writeFileSync('./views/' + fileName +'.hbs', result, 'utf8'); //更新hbs/html文件
	res.render(fileName); //返回渲染后的文件
}

function hbsCompile(template,spec){
	spec = spec.replace('<p>&nbsp;</p>',''); //滤除post数据在原文基础上引入的<p>&nbsp;</p>
	let obj = {body: spec};
	return template(obj).replace('<p> </p>',''); //滤除handlebars渲染引入的<p> </p>
}
//--------------------------

module.exports = router;
