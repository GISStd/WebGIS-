name;
pointsize;
pointcolor;
point;
//为地图容器添加单击事件监听
var handle = function (evt) {
    displayClose();
    $("#Menuhead span").html("标点");
    $(".MarkMenu").css("display", "block");
    $(".PointStyle").css("display", "block");
    //鼠标单击点坐标
    point = evt.coordinate;
}

//工具栏点击事件
$("#point").click(function () {
    map.on('click', handle);
    $(".ant-btn-primary").unbind();
    $(".ant-btn-primary").click(function () {
        name = $("#name").val();
        pointsize = $("#pointsize").val();
        pointcolor = $("#pointcolor").val();
        console.log(name);
        console.log(pointsize);
        console.log(pointcolor);
        if (name == null) {
            return false;
        }
        if (pointsize == null) {
            return false;
        }
        if (pointcolor == null) {
            return false;
        }
        addOverlayLabel(point, name, pointsize, pointcolor);
        displayClose();
        map.un('click', handle);
    })
    $(".ant-btn-default").unbind();
    $(".ant-btn-default").click(function () {
        map.un('click', handle);
        alert("已完成")
        displayClose();
    })
})

