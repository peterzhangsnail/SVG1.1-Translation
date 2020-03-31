const fs = require('fs');
const cmd = require('node-cmd'); //引入node-cmd命令行执行模块

//获取文献目录的html文件列表
let specDir = fs.readdirSync('../../SVG1.1', {withFileTypes: true});
let dirRec = []; //文件名数组(不含后缀)

for(key in specDir){
	if(specDir[key].isFile()){ //判断是目录还是文件
		trimNote(specDir[key].name); //清除文献html文件开头的注释
		dirRec.push(specDir[key].name.replace('.html', ''));
	}
}

//异步建立硬链接
dirRec.forEach(mklink);


//-----------函数定义区--------------------------------------
function trimNote(fileName){
	let raw = fs.readFileSync(`../../SVG1.1/${fileName}`,'utf8');
	let trim = raw.replace(/<!--[\d\D]+-->/,'');
	fs.writeFileSync(`../../SVG1.1/${fileName}`, trim, 'utf8');
}

function mklink(fileName){
	cmd.get(
		`mklink /h "./views/${fileName}.hbs" "../../SVG1.1/${fileName}.html"`, //用相对路径语法建立硬链接
		 function(err, data, stderr){
            console.log('the current working dir is : ',data);
        });
}
