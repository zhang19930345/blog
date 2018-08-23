/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-07-11 13:34:34 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-12 14:38:50
 */
const express = require('express');
const router = express.Router();
const User = require('../models/User')
//统一返回格式
var responseData;

router.use((req, res, next) => {
        responseData = {
                code: 0,
                message: ''
        }
        next();
})
//用户注册

/* 注册逻辑 
        1.用户名不能为空
        2.密码不能为空
        3.俩次密码输入必须一致
        4用户名是否被注册
                从数据库查询
*/
router.post('/user/register', (req, res, next) => {
        var username = req.body.username;
        var password = req.body.password;
        var repassword = req.body.repassword;
        if (username == '') {
                responseData.code = 1;
                responseData.message = '用户名不能为空';
                res.json(responseData);
                return;
        }
        if (password == '') {
                responseData.code = 2;
                responseData.message = '密码不能为空'
                res.json(responseData);
                return;
        }
        if (password != repassword) {
                responseData.code = 3;
                responseData.message = '俩次输入的密码不一致';
                res.json(responseData);
                return;
        };
        //用户名是否已经被注册了，如果数据库中有为注册，没有为没注册
        User.findOne({
                username: username
        }).then((userInfo) => {
                if (userInfo) {
                        responseData.code = 4;
                        responseData.message = "用户已经被注册";
                        res.json(responseData);
                        return;
                }
                //保存用户注册的信息到数据库中
                var user = new User({
                        username: username,
                        password: password
                });
                return user.save();
        }).then((newUserInfo) => {
                responseData.message = '注册成功';
                res.json(responseData);
        })
});
//
/* 
登录
*/
router.post('/user/login', (req, res, next) => {
        var username = req.body.username;
        var password = req.body.password;
        if (username == '' || password == '') {
                responseData.code = 1;
                responseData.message = '用户名密码不能为空';
                res.json(responseData);
                return;
        };
        //
        User.findOne({
                username: username,
                password: password
        }).then((userInfo) => {
                if (!userInfo) {
                        responseData.code = 2;
                        responseData.message = '用户名或密码错误';
                        res.json(responseData);
                        return;
                }
                responseData.message = "登录成功";
                responseData.userInfo = {
                        _id: userInfo._id,
                        username: userInfo.username
                }
                /* cookies.set('userInfo', JSON.stringify({
                        _id: userInfo._id,
                        username: userInfo.username
                })) */
                res.json(responseData);
                return;
        });
});

/* 退出 */
router.get('/user/logout', (req, res) => {
        req.cookies.set('userInfo', null);
        responseData.message = '退出成功';
        res.json(responseData);
});

module.exports = router;