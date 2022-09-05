$(function () {
    var layer = layui.layer;

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //2.实现文件上传功能
    $('#btnChooseImg').on('click', function () {
        //模拟点击文件选择框
        $('#file').click();
    })


    //3.为文件选择框绑定change事件'
    $('#file').on('change', function (e) {
        // console.log(e);
        //获取选择的文件列表
        var fileList = e.target.files;
        // console.log(fileList);
        // console.log(fileList.length);

        if (fileList.length === 0) { //没有选择文件
            return layer.msg('请选择图片!');
        }

        //有选择文件 获取选择的文件
        //3.1拿到用户选择的文件
        var file = fileList[0];
        // console.log(file);
        //3.2根据选择的文件，创建一个对应的 URL 地址
        var imgURL = URL.createObjectURL(file);
        //3.3先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', imgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })


    //4.为确定btnUpload按钮绑定点击事件  实现头像的更新
    $('#btnUpload').on('click', function () {
        //4.1拿到用户裁剪的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        //4.2发起头像上传的请求 更换头像
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('用户头像更新失败!');
                }
                layer.msg('用户头像更新成功!');

                //调用自定义的更换头像函数
                window.parent.getUserInfo();
            }
        })
    })
})