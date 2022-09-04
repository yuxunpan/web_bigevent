//通过jquery $.ajaxPrefilter函数 封装项目的路径 根路径+每个请求配置项的url
$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    console.log(options.url);
})