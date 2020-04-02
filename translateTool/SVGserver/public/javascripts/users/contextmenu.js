window.onload = function(){
    var win = document.getElementsByTagName('iframe')[0].contentWindow;
    var doc = win.document;
    var body = doc.querySelector('#tinymce');

//改变外部window的hash值时,内部同时改变
    window.onhashchange = function(){
      win.location.hash = window.location.hash;
    }

//新窗口打开时,不触发onhashchang事件,此时强制设置内部hash等于外部hash
    win.location.hash = window.location.hash;


//内部window自定义右键菜单事件
    body.oncontextmenu = menuEvent;


//------------函数定义区--------------------------------------    
    function menuEvent(e){
     //阻止右键默认行为
     e.preventDefault();

     //显示自定义菜单
     showMenu(e);
   }

   function showMenu(e){
     //新建并添加菜单元素到内部body
     var menu = document.createElement('div'); //菜单div容器
     body.appendChild(menu);

     var scroll = document.createElement('div'); //转到本页对应锚点的选项
     scroll.innerHTML = "转到";
     addScrollEvent(e,scroll,menu); //添加事件

     var open = document.createElement('div'); //新窗口打开链接的选项D
     open.innerHTML = "新窗口打开";
     addOpenEvent(e,open,menu); //添加事件

     menu.appendChild(scroll);
     menu.appendChild(open);
     menu.contentEditable = false; //设置菜单元素不可编辑(这一步很有必要,否则会继承父元素的contentEditable为true)

     //应用menu样式
     activeMenu(e, menu);
   }

   function addScrollEvent(e,scroll,menu){
     scroll.addEventListener(
      'click', 
      function(e,menu,evt){

        function scroll(){
           if(e.target.href && typeof e.target.href == 'string'){
             var href = e.target.href;
             var match = href.match(/#[^#]+$/);
             var id = Array.isArray(match) ? match[0] : false;

             window.location.hash = win.location.hash = id; //内部hash值改变,外部随之改变
             return true; //成功修改hash值,返回true
           }
           return false; //不满足条件,未能修改hash值,返回false
        }

        var temp = null; //定义用于保存e.target的父节点的变量
        while(e.target != null){
            if(scroll()){
              break; //scroll()返回true,跳出循环
            }

            temp = e.target.parentNode; //保存e.target的父节点
            e = {}; //因为最初的e是Event接口的实例,e.target是只读的,不能赋新值.我们这里将e替换为空对象
            e.target = temp; //将保存的父节点传给空对象的target属性(向上取父节点,继续循环)
        }

       body.removeChild(menu); //点击之后将菜单元素从dom移除  
     }.bind(null,e,menu) //必须用bind将上一次右键事件的event对象(e)传递给本次click事件的回调函数,这样才能获取锚点的信息
    );
   }

   function addOpenEvent(e,open,menu){
     open.addEventListener(
      'click',
      function(e,menu,evt){
        if(e.target.href && typeof e.target.href == 'string'){
         var href = e.target.href;
         var match = href.match(/[\w.]+.html$/);
         var id = Array.isArray(match) ? href : false;

         window.open(href);
        }

        body.removeChild(menu); //点击之后移除该元素
      }.bind(null,e,menu) //必须用bind将上一次右键事件的event对象(e)传递给本次click事件的回调函数,这样才能获取锚点的信息
     );
   }

   function activeMenu(e,menu){
    //必须使用右键鼠标事件的pageY和pageX而非clientX与clientY属性来定位
     var position = "position: absolute; z-index: 999; top: " + e.pageY + "px; left: " + e.pageX + "px;"; //定位样式
     var look = "background-color: white; opacity: 1.0; border: 1px solid grey; padding: 2px 10px"; //外观样式
     var style = position + look;

     menu.setAttribute('style',style);
   }
}  
