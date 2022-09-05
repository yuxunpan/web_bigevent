$(function () {

    //1.为表单添加验证规则
    var form = layui.form;
    form.verify({
        //密码
        pwd: [
            /^[\S]{6,15}$/
            , '密码必须6到15位，且不能出现空格'
        ],
        //新密码不能与原来密码重复
        samePwd: function (value) {
            var oldPwd = $('[name=oldPwd]').val();
            // console.log(oldPwd);
            if (value === oldPwd) {
                return '新旧密码不能一致！'
            }
        },
        // 确认密码验证规则与密码框内容一致
        rePwd: function (value) {  //value：表单的值、item：表单的DOM对象
            var pwd = $('#new_pwd').val();
            if (pwd !== value) {
                return '新密码与确认密码不一致！';
            }
        }
    })


    //2.发起更改密码的Ajax请求 监听表单提交事件
    $('.layui-form').submit(function (e) {
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(), //快速获取表单中的值
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('原密码错误!');
                }
                layui.layer.msg('修改密码成功!');

                //清空表单中的值 重置
                $('.layui-form')[0].reset();
            }
        })
    })
})