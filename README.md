# SVG1.1-Translation

## 文件夹目录

### SVG1.1

SVG1.1html文献存放的目录

### [translateTool](/translateTool/SVGserver/)

所见即所得(WYSIWYG)的SVG1.1文献编辑工具:

* 启动网站,浏览器进入网页
* 直接编辑文本,避免了直接编辑html源代码的麻烦
* .编辑完毕, 点击保存按钮即可更新服务器内html文件

### vendor

用于存放静态资源的文件夹

### index.html/.nojekyll

将项目根目录用docsify init初始化而生成的文件: index.html是渲染模板

### my404.md

自定义的404页面内容

---

## 项目构建一览

### 项目结构

[项目结构图](/vendor/SVG1.1-Translation项目)

### 搭建tinyMCE网站流程

[搭建tinyMCE网站流程](/vendor/搭建tinyMCE.md)

### 搭建docsify文档网站流程

[搭建docsify文档网站流程](/vendor/搭建docsify.md)

### 使用

1. 下载安装npm并克隆或下载repository
2. 安装依赖
   * 切换到 SVG1.1-Translation/translateTool/SVGserver/目录下
   * 打开cmd,输入`npm install`
3. 构造硬链接: 
   * 切换到 SVG1.1-Translation/translateTool/SVGserver/目录下
   * 打开cmd,输入`node hardlink.js`
4. 启动tinyMCE文献编辑网站
   * 切换到 SVG1.1-Translation/translateTool/SVGserver/目录下
   * 打开cmd,输入`npm run start`
5. 启动docsify文档网站
   * 切换到 SVG1.1-Translation/translateTool/SVGserver/目录下
   * 打开cmd,输入`npm run docs`