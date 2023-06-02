//为地图容器添加单击事件监听
map.on('click', function (evt) {
    var type = $("input[name='label']:checked").val();
    //鼠标单击点坐标
    var point = evt.coordinate;
    if (type == "vector") {
        //添加一个新的标注（矢量要素）
        addVectorLabel(point);
    }
    else if (type == "overlay") {
        //添加新的图文标注（overlay标注）
        addOverlayLabel(point);
    }
});

/**
* 添加一个新的标注（矢量要素）
* @param {ol.Coordinate} coordinate 坐标点
*/
function addVectorLabel(coordinate) {
    //新建一个要素 ol.Feature
    var newFeature = new ol.Feature({
        //几何信息
        geometry: new ol.geom.Point(coordinate),
        //名称属性
        name: '标注点'
    });
    //设置要素的样式
    newFeature.setStyle(createLabelStyle(newFeature));
    //将新要素添加到数据源中
    vectorSource.addFeature(newFeature);
}

/**
* 添加一个新的图文标注（overlay标注）
* @param {ol.Coordinate} coordinate 坐标点
*/
function addOverlayLabel(coordinate) {
    //新增div元素
    var elementDiv = document.createElement('div');
    elementDiv.className = "marker";
    elementDiv.title = "标注点";
    // 获取id为label的元素
    var overlay = document.getElementById('label');
    // 为ID为label的div层添加div子节点
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