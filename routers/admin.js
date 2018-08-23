/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-07-11 11:28:46 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-13 14:28:33
 */
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const category = require('../models/Category');
router.use((req, res, next) => {
        /*   if (!req.userInfo.isAdmin) {
                  res.send('对不起，只有管理员才能进入的页面');
                  return;
          } */
        next();
});
/* 首页 */
router.get('/', (req, res, next) => {

        res.render('admin/index', {
                userInfo: req.userInfo
        });
});
router.get('/user', (req, res) => {


        /* res.render('admin/user_index', {
                userInfo: req.userInfo
        }); */
        /* 从数据库中读取所有用户的数据 
        limit(Number):限制获取的数据条数
        skip():忽略数据的条数//做分页
        *1：1-2 skip:0->当前页-1*limit（显示的条数）
        *2:3-4 skip:2
        */
        //给page做验证是否为数字
        var page = Number(req.query.page || 1);
        var limit = 2;
        var pages = 0;
        User.countDocuments().then((count) => {
                //计算总页数
                pages = Math.ceil(count / limit);
                //取值不能超过pages总页数
                page = Math.min(page, pages);
                //取值不能小于1
                page = Math.max(page, 1);
                var skip = (page - 1) * limit;

                User.find().limit(limit).skip(skip).then((users) => {
                        //console.log(users);
                        res.render('admin/user_index', {
                                userInfo: req.userInfo,
                                users: users,
                                count: count,  //总条数
                                pages: pages, //总页数
                                limit: limit, //每页显示的条数
                                page: page    //当前页
                        })

                })

        });
});
/* 分类首页 */
router.get('/category', (req, res) => {
        var page = Number(req.query.page || 1);
        var limit = 2;
        var pages = 0;
        category.countDocuments().then((count) => {
                //计算总页数
                pages = Math.ceil(count / limit);
                //取值不能超过pages总页数
                page = Math.min(page, pages);
                //取值不能小于1
                page = Math.max(page, 1);
                var skip = (page - 1) * limit;

                category.find().limit(limit).skip(skip).then((categorys) => {
                        //console.log(users);
                        res.render('admin/category_index', {
                                userInfo: req.userInfo,
                                categorys: categorys,
                                count: count,  //总条数
                                pages: pages, //总页数
                                limit: limit, //每页显示的条数
                                page: page    //当前页
                        })

                })

        });
});

/* 分类的添加 */
router.get('/category/add', (req, res) => {
        //console.log(req.body);
        res.render('admin/category_add', {
                userInfo: req.userInfo
        });

});
// 分类的保存
router.post('/category/add', (req, res) => {
        let name = req.body.name || '';
        if (name == '') {
                res.render('admin/error', {
                        userInfo: req.userInfo,
                        message: "名称不能为空"
                });
                return;
        }
        category.findOne({
                name: name
        }).then((rs) => {
                if (rs) {
                        //数据库中已经存在改分类了
                        res.render('admin/error', {
                                userInfo: req.userInfo,
                                message: '分类已经存在了'
                        })
                        return Promise.reject();
                } else {
                        //数据库中部存在该分类，可以保存
                        return new category({
                                name: name
                        }).save();
                }
        }).then((newCategory) => {
                res.render('admin/success', {
                        userInfo: req.userInfo,
                        message: "分类保存成功",
                        url: "/admin/category"
                })
        })
});
//分类修改

router.get('/category/edit', (req, res) => {
        //获取修改分类的信息，并且用表单的形式展现出来
        var id = req.query.id || '';
        //获取要修改的分类信息
        category.find({
                id: id
        }).then((category) => {
                if (!category) {
                        res.render('admin/error', {
                                userInfo: req.userInfo,
                                message: '分类信息不存在'
                        });
                        return Promise.reject();
                } else {
                        res.render('admin/category_edit', {
                                userInfo: req.userInfo,
                                category: category
                        });
                }
        })
});
//分类的修改保存
router.post('category/edit', (req, res) => {
        var id = req.query.id || '';
        var name = req.query.name || '';
        category.find({
                id: id
        }).then((category) => {
                if (!category) {
                        res.render('admin/error', {
                                userInfo: req.userInfo,
                                message: '分类信息不存在'
                        });
                        return Promise.reject();
                } else {
                        //当用户没有做任何的修改提交的时候

                        if (name = category.name) {
                                res.render('admin/success', {
                                        userInfo: req.userInfo,
                                        message: "修改成功",
                                        url: "/admin/category"
                                })
                                return Promise.reject();
                        } else {
                                category.findOne({
                                        _id: { $ne: id },
                                        name: name
                                })
                        }
                        //要修改的分类名称是否已经在数据库中
                }
        }).then((sameCategory) => {
                if (sameCategory) {
                        res.render('admin/error', {
                                userInfo: req.userInfo,
                                message: "数据库中已经存在同类名称"
                        })
                } else {
                        return category.update({
                                _id: id
                        }, {
                                        name: name
                                }
                        )
                }
        }).then(() => {
                res.render('admin/success', {
                        userInfo: req.userInfo,
                        message: "修改成功",
                        url: "/admin/category"
                })
        })
});
//分类删除
router.get('/category/delete', (req, res) => {
        var id = req.query.id || '';
        category.remove({
                _id: id
        }).then(() => {
                res.render('admin/success', {
                        usserInfo: req.userInfo,
                        message: "删除成功",
                        url: "/admin/category"
                })
        })
});
module.exports = router;