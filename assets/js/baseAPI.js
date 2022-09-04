//通过jquery $.ajaxPrefilter函数 封装项目的路径 根路径+每个请求配置项的url
$.ajaxPrefilter(function (options) {
    //在发起真正的Ajax请求之前同意拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    // console.log(options.url);

    //统一为有权限的接口设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //同意全局挂载complete配置对象
    options.complete = function (res) {
        // console.log(res);
        // console.log(res.responseJSON); //拿到服务器响应回来的数据

        //用户没登陆 身份认证失败 不能访问主页
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //强制清空本地存储的token
            localStorage.removeItem('token')
            //强制跳转到登录页
            location.href = '/login.html';
        }
    }
})