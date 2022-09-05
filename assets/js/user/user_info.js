$(function () {
    //1.定义layui用户昵称的验证规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nikname: function (value) {
            if (value.length > 6) {
                return '用户昵称必须在1~6个字符之间!';
            }
        }
    })
    initUserInfo()

    //2.获取用户信息  填充对应数据导表岛中
    function initUserInfo() {
        //发起请求
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败!');
                }
                // console.log(res);

                //利用layui中form.val快速将获取过来的用户信息填充到表单
                //快速为表单赋值
                form.val('formUserInfo', res.data);

            }
        })
    }

    //3.重置表单事件 绑定点击事件阻止默认的重置行为
    $('#btnReset').on('click', function (e) {
        e.preventDefault();

        //获取原先的用户信息 并为表单赋值 调用initUserInfo函数
        initUserInfo();
    })

    //4.监听表单的提交事件 阻止默认的提交行为 发起更新数据的请求
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),//快速获取表单中的值
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败!');
                }
                layer.msg('修改用户信息成功!');

                //调用父页面index.js中的方法 重新获取用户信息并渲染头像
                window.parent.getUserInfo();
            }
        })
    })
})