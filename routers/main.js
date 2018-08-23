/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-07-11 13:41:41 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-12 08:36:33
 */
const express = require('express');
const router = express.Router();
router.get('/', (req, res, next) => {
        res.render('main/index', {
                userInfo: req.userInfo
        });
});

module.exports = router;