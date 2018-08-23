//定义当应用所使用的模板引擎
//第一个参数表示模板引擎名称 同时也表示模板文件名的后缀
//第二个参数表示用于解析处理模板内容的方法
/* app.engine('html', swig.renderFile);
//设置模板文件存放目录，第一个参数必须是views ，第二个参数是目录
app.set('views', './views');
//注册所使用的模板引擎，第一个参数必须是 view engine ,第二个参数和app.engine这个方法中定义的模板引擎的名称（第一个参数）是一致的
app.set('view engine', 'html');

app('/', (req, res, next) => {


        /* 读取views目录下的制定文件，解析并返回给客户端第一个参数：表示模板文件，相当于views目录 */
//res.render('index');


//}); */
 <!--  {% if userInfo._id %} -->
                <!-- 如果id存在渲染出以下内容 -->
                <!-- {% else %} -->
                 {% endif %}