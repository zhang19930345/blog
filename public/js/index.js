/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-07-11 14:24:03 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-07-12 13:13:19
 */
$(function () {
        var $loginBox = $('#loginBox');
        var $registerBox = $('#registerBox');
        var $userInfo = $('#userInfo');
        $loginBox.find('a').on('click', function () {

        });
        //注册
        $registerBox.find('button').on('click', () => {
                $.ajax({
                        type: 'post',
                        url: "/api/user/register",
                        data: {
                                username: $registerBox.find('[name="username"]').val(),
                                password: $registerBox.find('[name="password"]').val(),
                                repassword: $registerBox.find('[name="repassword"]').val()
                        },
                        dataType: 'json',
                        success: (result) => {
                                $registerBox.find('.colWarning').html(result.message);
                                if (!result.code) {
                                        //注册成功
                                        setTimeout(() => {
                                                $loginBox.show();
                                                $registerBox.hide();
                                        }, 1000);

                                }
                        }
                })
        })
        //登录
        $loginBox.find('button').on('click', () => {
                $.ajax({
                        type: "post",
                        url: "/api/user/login",
                        data: {
                                username: $loginBox.find('[name="username"]').val(),
                                password: $loginBox.find('[name="password"]').val()
                        },
                        dataType: 'json',
                        success: (result) => {
                                console.log(result);
                                setTimeout(() => {
                                        $loginBox.hide();
                                        $registerBox.hide();
                                        $userInfo.find('.username').html(result.userInfo.username);
                                        $userInfo.find('.info').html('欢迎光临我的博客')
                                }, 1000);
                        }
                })
        });

        //退出
        $('#logout').on('click', () => {
                $.ajax({
                        url: '/api/user/logout',

                })
        })
})