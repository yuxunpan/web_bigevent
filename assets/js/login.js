$(function () {
    //一、 登录页和注册页的切换
    // 登录页点击注册账号显示注册页面
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 注册页点击登录账号显示登录页面
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
        flag = true;

    })

    var flag = 0;
    //二、点击eye 密码框变文本框
    function getEye(id, id1, id2, id3) {
        $(id).on('click', function () {
            if (flag == 0) {
                $(id1).attr('type', '=text');
                $(id2).hide();
                $(id3).attr('style', 'display: block;');
                flag = 1;
            } else {
                $(id1)[0].type = 'password';
                $(id3).attr('style', 'display: none;')
                $(id2).show();
                flag = 0;
            }
        })
    };
    getEye('#eye', '.pwd', '#eye-close', '#eye-open')
    getEye('#eye1', '.pwd1', '#eye-close1', '#eye-open1')
    getEye('#eye2', '.pwd2', '#eye-close2', '#eye-open2')


    //三、layui自定义表单验证规则
    var form = layui.form;   //从layui中获取form对象
    var layer = layui.layer;  //从layui中获取layer对象  提示信息
    //通过form.verify()函数自定义验证规则
    form.verify({
        pwd: [
            /^[\S]{6,15}$/
            , '密码必须6到15位，且不能出现空格'
        ],
        // 确认密码验证规则与密码框内容一致
        repwd: function (value) {  //value：表单的值、item：表单的DOM对象
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致！';
            }
        }
    })

    //四、监听注册表单的提交事件 发起注册请求POST
    $('#form_reg').on('submit', function (e) {
        //阻止表单的默认提交行为 使用Ajax提交
        e.preventDefault();
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() };
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                // return console.log(res.message);
                return layer.msg((res.message));
            }
            // console.log('注册成功！');
            layer.msg('注册成功，请登录');

            //注册成功后自动跳转到登录页面 调用link_login的点击行为
            $('#link_login').click();
        })
    })

    //五、监听登陆表单的提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),  //快速获取表单的数据
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！');
                }
                layer.msg('登录成功！');
                // console.log(res.token);  //登陆成功后获取数据的权限
                //将其保存到本地
                localStorage.setItem('token', res.token);

                //登陆成功跳转到主页
                location.href = '/index.html'
            }
        })
    })
})