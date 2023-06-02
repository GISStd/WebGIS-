/**
* overlay的样式是通过HTML和CSS进行设计的。
* 添加一个新的图文标注（overlay标注）
* @param {ol.Coordinate} coordinate 坐标点
*/
function addOverlayLabel(coordinate, name, markesize, markecolor) {
    //新增div元素
    var elementDiv = document.createElement('div');
    elementDiv.className = "marker";
    elementDiv.title = name;
    elementDiv.style.width = markesize + "px";
    elementDiv.style.height = markesize + "px";
    elementDiv.style.backgroundColor = markecolor;
    // 获取id为overlay的元素
    var overlay = document.getElementById('overlay');
    // 为ID为overlay的div层添加div子节点
    overlay.appendChild(elementDiv);
    //新增a元素
    var elementA = document.createElement("a");
    elementA.className = "address";
    elementA.href = "#";
    //设置文本
    setInnerText(elementA, elementDiv.title);
    // 新建的div元素添加a子节点
    elementDiv.appendChild(elementA);

    //实例化图文标注（图形+文本），添加到地图容器中
    var newMarker = new ol.Overlay({
        position: coordinate,
        positioning: 'center-center',
        element: elementDiv,
        stopEvent: false
    });
    map.addOverlay(newMarker);
    var newText = new ol.Overlay({
        position: coordinate,
        element: elementA
    });
    map.addOverlay(newText);
}

/**
* 动态设置元素文本内容（兼容）
*/
function setInnerText(element, text) {
    if (typeof element.textContent == "string") {
        element.textContent = text;
    } else {
        element.innerText = text;
    }
}

//标点点击事件
$("#point").click(function () {
    //为地图容器添加单击事件监听
    // map.on('click', function (evt) {
    //     //鼠标单击点坐标
    //     var point = evt.coordinate;
    //     var name = $("#name").val();
    //     var pointsize = $("#pointsize").val();
    //     var pointcolor = $("#pointcolor").val();
    //     console.log(name);
    //     console.log(pointsize);
    //     console.log(pointcolor);
    //     if (name == null) {
    //         return false;
    //     }
    //     if (pointsize == null) {
    //         return false;
    //     }
    //     if (pointcolor == null) {
    //         return false;
    //     }
    //     addOverlayLabel(point, name, pointsize, pointcolor);
    // });
})