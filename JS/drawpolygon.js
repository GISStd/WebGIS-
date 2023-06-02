newpstyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new ol.style.Stroke({
        color: 'rgba(255, 255, 255, 0.2)',
        lineDash: [10, 10],
        width: 2
    })
});
$("#polygon").click(function () {
    map.removeInteraction(draw);
    map.un('click', handle);
    $(".ant-btn-primary").click(function () {
        name = $("#name").val();
        polygoncolor = $("#polygoncolor").val();
        polygonwidth = $("#boardwidth").val();
        opacity = $('#popacity').val();
        console.log(name);
        console.log(polygoncolor);
        console.log(polygonwidth);
        console.log(parseFloat(opacity));
        if (name == null) {
            return false;
        }
        if (polygoncolor == null) {
            return false;
        }
        if (polygonwidth == null) {
            return false;
        }
        newpstyle = new ol.style.Style({
            fill: new ol.style.Fill({
                color: polygoncolor
            }),
            stroke: new ol.style.Stroke({
                color: polygoncolor,
                lineDash: [10, 10],
                width: polygonwidth
            })
        })
        vector.setOpacity(parseFloat(opacity))
        displayClose();
        map.removeInteraction(draw);
    })
    $(".ant-btn-default").click(function () {
        displayClose();
        map.removeInteraction(draw);
    })
    addpolyInteraction("Polygon");
})

$("#circle").click(function () {
    map.removeInteraction(draw);
    map.un('click', handle);
    $(".ant-btn-primary").click(function () {
        name = $("#name").val();
        polygoncolor1 = $("#circlecolor").val();
        polygonwidth1 = $("#circlewidth").val();
        opacity1 = $('#copacity').val();
        console.log(name);
        console.log(polygoncolor1);
        console.log(polygonwidth1);
        console.log(parseFloat(opacity1));
        if (name == null) {
            return false;
        }
        if (polygoncolor1 == null) {
            return false;
        }
        if (polygonwidth1 == null) {
            return false;
        }
        newpstyle = new ol.style.Style({
            fill: new ol.style.Fill({
                color: polygoncolor1
            }),
            stroke: new ol.style.Stroke({
                color: polygoncolor1,
                lineDash: [10, 10],
                width: polygonwidth1
            })
        })
        vector.setOpacity(parseFloat(opacity1))
        displayClose();
    })
    $(".ant-btn-default").click(function () {
        displayClose();
        map.removeInteraction(draw);
    })
    addpolyInteraction("Circle");
})

$("#rectangle").click(function () {
    map.removeInteraction(draw);
    map.un('click', handle);
    $(".ant-btn-primary").click(function () {
        name = $("#name").val();
        polygoncolor2 = $("#rectcolor").val();
        polygonwidth2 = $("#rectwidth").val();
        opacity2 = $('#ropacity').val();
        console.log(name);
        console.log(polygoncolor2);
        console.log(polygonwidth2);
        console.log(parseFloat(opacity2));
        if (name == null) {
            return false;
        }
        if (polygoncolor2 == null) {
            return false;
        }
        if (polygonwidth2 == null) {
            return false;
        }
        newpstyle = new ol.style.Style({
            fill: new ol.style.Fill({
                color: polygoncolor2
            }),
            stroke: new ol.style.Stroke({
                color: polygoncolor2,
                lineDash: [10, 10],
                width: polygonwidth2
            })
        })
        vector.setOpacity(parseFloat(opacity2))
        displayClose();
    })
    $(".ant-btn-default").click(function () {
        displayClose();
        map.removeInteraction(draw);
    })
    addpolyInteraction("Box");
});

function addpolyInteraction(key) {
    console.log('开始编辑');
    var value = key; //绘制类型
    if (source == null) {
        source = new ol.source.Vector({ wrapX: false });
        vector.setSource(source); //添加绘制层数据源
    }
    var geometryFunction, maxPoints;
    if (value === 'Square') {
        value = 'Circle';
        geometryFunction = ol.interaction.Draw.createRegularPolygon(4); //正方形图形（圆）
    } else if (value === 'Box') {
        value = 'LineString';
        maxPoints = 2;
        geometryFunction = function (coordinates, geometry) {
            var start = coordinates[0];
            var end = coordinates[1];
            if (!geometry) {
                geometry = new ol.geom.Polygon(
                    [start, [start[0], end[1]], end, [end[0], start[1]], start]
                ); //多边形-画长方形
            }
            geometry.setCoordinates([
                [start, [start[0], end[1]], end, [end[0], start[1]], start]
            ]);
            return geometry;
        };
    }
    //实例化交互绘制类对象并添加到地图容器中
    draw = new ol.interaction.Draw({
        source: source, //绘制层数据源
        type: /** @type {ol.geom.GeometryType} */(value), //几何图形类型
        geometryFunction: geometryFunction, //几何信息变更时调用函数
        maxPoints: maxPoints, //最大点数
        style: newpstyle
    });
    map.addInteraction(draw);

    var listener;
    //绑定交互绘制工具开始绘制的事件
    draw.on('drawstart',
        function (evt) {
            // set sketch
            sketch = evt.feature; //绘制的要素
            sketch.setStyle(newpstyle);
        }, this)
    draw.on('drawend',
        function (evt) {
            displayPolygon();

            sketch = null;
        }, this)
}
