/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-07-11 09:53:04 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-12 14:18:43
 */
const express = require('express');
const swig = require('swig');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Cookies = require('cookies');
const cookieParser = require('cookie-parser');
const User = require('./models/User');
const app = express();
//设置静态文件托管
app.use('/public', express.static(__dirname + '/public'));
app.engine('html', swig.renderFile);
app.set('views', './views');
app.set('view engine', 'html');
swig.setDefaults({ cache: false });

app.use(bodyParser.urlencoded({ extended: true }));
//设置cookies

app.use((res, req, next) => {
        req.cookies = new Cookies(req, res);
        //解析登录用户的cookie信息
        req.userInfo = {};

        //console.log(req.cookies.get('userInfo'));
        /* if (req.cookies.get('userInfo')) {
                try {//解析json字符串
                        req.userInfo = JSON.parse(req.cookies.get('userInfo'));
                        //获取当前登录用户的信息
                        User.findById(req.userInfo._id).then((userInfo) => {
                                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                                next();
                        });

                } catch (e) {
                        next();
                }
        } else {
                next();
        } */
        next();
});


/* 根据不同的功能划分模块 */
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));

mongoose.connect('mongodb://localhost:27018/blog', (err) => {
        if (err) {
                console.log('数据库链接失败');
        } else {
                console.log('数据库链接成功');
                app.listen(5656, () => {
                        console.log('服务启动')
                });
        }
});
