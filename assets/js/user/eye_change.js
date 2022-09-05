$(function () {
    getEye('#eye_pwd', '#origin_pwd', '#eye-close', '#eye-open')
    getEye('#eye_npwd', '#new_pwd', '#eye-close_1', '#eye-open_1')
    getEye('#eye_renpwd', '#confirm_pwd', '#eye-close_2', '#eye-open_2')
})

var flag = 0;
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