/**图层控制点击事件**/
$(function(){
    $(".layerTree dd").hide();//隐藏
    // 系统默认显示第一行菜单
    $("#layer_dt").parent().find('dd').show();//默认显示第一行菜单
    $("#layer_dt").css({"background-color":"#1f6b75"});//焦点一级菜单项的样式
    // 一级菜单项点击事件
    $(".layerTree dt").click(function(){
        console.log("点击事件")
        //判断当前一级菜单下的二级菜单项是否隐藏
        if ($(this).parent().find('dd').is(":hidden")) {
            $(this).parent().find('dd').slideToggle(); //滑动方式展开子菜单
            $(this).css({ "background-color": "#1f6b75" }); //焦点一级菜单项背景颜色             
        }
        else {
            $(this).parent().find('dd').slideUp(); //滑动方式隐藏子菜单
            $(this).css({ "background-color": "#339999" }); //非焦点一级菜单项背景颜色
        }
    })
})