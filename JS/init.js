/**系统初始默认页面源码显示 **/
$(function () {
    setCore("init", "test"); //显示默认页面的源码
})

// 页面跳转
function setCore(name, catalog) {
    var pageName = name;
    var htmlUrl = "demos/" + catalog +"/" + pageName + ".html"; //请求的页面
    console.log('一调用');
    var htmlString = ""; //请求页面的代码（字符串形式）
    jQuery.ajax({
        async: false,
        url: htmlUrl,
        success: function (result) {
            htmlString = result;
        }
    });
    $('#container_iframe').attr("src", htmlUrl); //设置右侧容器的页面地址   
}
