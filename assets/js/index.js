$(function () {
    //1.调用封装的发起请求函数 获取用户的基本信息
    getUserInfo();

    //3.点击退出链接 弹出确认提示框 清空本地存储的数据 跳转到登陆页面
    $('#btnLogout').on('click', function () {
        layui.layer.confirm('此操作将退出登录, 是否继续?', { icon: 3, title: '提示' }, function (index) {

            //清空本地存储的数据
            localStorage.removeItem('token');
            //跳转到登陆页面
            location.href = '/login.html';


            layer.close(index);
        });
    })
})

//发起请求 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        //封装在baseAPI.js中
        // 这里注意提前引入项目的具体路径js文件
        url: '/my/userinfo',

        //封装在baseAPI.js中
        // headers请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },

        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！');
            }
            //2.调用自定义函数 渲染用户头像以及欢迎文本
            renderAvatar(res.data);
        },

        //封装在baseAPI.js中
        // // 4.不登录的情况下不能访问主页 不论成功与否都会调用complete回调函数
        // complete: function (res) {
        //     // console.log(res);
        //     // console.log(res.responseJSON); //拿到服务器响应回来的数据

        //     //用户没登陆 身份认证失败 不能访问主页
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //强制清空本地存储的token
        //         localStorage.removeItem('token')
        //         //强制跳转到登录页
        //         location.href = '/login.html';
        //     }
        // }
    })
}

function renderAvatar(user) {
    //渲染文本
    //获取用户的名称  昵称||用户名  如果有昵称优先渲染昵称到欢迎文本
    var uname = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + uname);

    //渲染头像 图片头像||文本头像
    if (user.user_pic !== null) { //图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text_avatar').hide();
    } else { //文本头像
        $('.layui-nav-img').hide();
        $('.text_avatar').html(uname[0].toUpperCase()).show();
    }
}