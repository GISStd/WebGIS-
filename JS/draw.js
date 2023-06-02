; newstyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new ol.style.Stroke({
        color: 'rgba(255, 255, 255, 0.2)',
        lineDash: [10, 10],
        width: 2
    })
});

//绘制绘画对象
var DrawToolElement;

//显示绘画结果
var drawTooltip;

function createDrawTooltip() {
    if (DrawToolElement) {
        DrawToolElement.parentNode.removeChild(DrawToolElement);
    }
    DrawToolElement = document.createElement('div');
    DrawToolElement.className = 'tooltip tooltip-measure';
    drawTooltip = new ol.Overlay({
        element: DrawToolElement,
        offset: [0, -15],
        positioning: 'bottom-center'
    });
    map.addOverlay(drawTooltip);
}

function addDrawInteraction(key,sign) {
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
        style: newstyle
    });
    map.addInteraction(draw);

    createDrawTooltip();

    var  listener;
    //绑定交互绘制工具开始绘制的事件
    draw.on('drawstart',
        function (evt) {
            // set sketch
            sketch = evt.feature; //绘制的要素
            sketch.setStyle(newstyle);
            /** @type {ol.Coordinate|undefined} */
            var tooltipCoord = evt.coordinate;// 绘制的坐标
            //绑定change事件，根据绘制几何类型得到测量长度值或面积值，并将其设置到测量工具提示框中显示
            listener = sketch.getGeometry().on('change', function (evt) {
                var geom = evt.target;//绘制几何要素
                var output;
                if (geom instanceof ol.geom.Polygon) {
                    output = sign
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();//坐标
                } else if (geom instanceof ol.geom.LineString) {
                    output = sign
                    tooltipCoord = geom.getLastCoordinate();//坐标
                }else if (geom instanceof ol.geom.Circle) {
                    output = sign
                    tooltipCoord = geom.getFirstCoordinate();//坐标
                }
                DrawToolElement.innerHTML = output;//将测量值设置到测量工具提示框中显示
                drawTooltip.setPosition(tooltipCoord);//设置测量工具提示框的显示位置
            });
        }, this)
    draw.on('drawend',
        function (evt) {
            DrawToolElement.className = 'tooltip tooltip-static'; //设置测量提示框的样式
            drawTooltip.setOffset([0, -7]);
            sketch = null;
            DrawToolElement = null; //置空测量工具提示框对象
            createDrawTooltip();//重新创建一个测试工具提示框显示结果
            map.removeInteraction(draw);
            ol.Observable.unByKey(listener);
        }, this)
}

$("#line").click(function () {
    map.removeOverlay(helpTooltip);
    map.removeOverlay(measureTooltip);
    map.removeInteraction(draw);
    displayClose();
    $("#Menuhead span").html("线要素绘制")
    $(".MarkMenu").css("display", "block");
    $(".LineStyle").css("display", "block");
    $(".ant-btn-primary").unbind();
    $(".ant-btn-primary").click(function () {
        linename = $("#name").val();
        linecolor = $("#linecolor").val();
        linewidth = $("#linewidth").val();
        console.log(linename);
        console.log(linecolor);
        console.log(linewidth);
        if (linename == null) {
            return false;
        }
        if (linecolor == null) {
            return false;
        }
        if (linewidth == null) {
            return false;
        }
        newstyle = new ol.style.Style({
            fill: new ol.style.Fill({
                color: linecolor
            }),
            stroke: new ol.style.Stroke({
                color: linecolor,
                lineDash: [10, 10],
                width: linewidth
            })
        })
        addDrawInteraction('LineString',linename);
        displayClose();
    });
    $(".ant-btn-default").unbind();
    $(".ant-btn-default").click(function () {
        displayClose();
        map.removeInteraction(draw);
    })
});

//绑定绘制多边形事件
function bindpolygon() {
    polyname = $("#name").val();
    polygoncolor = $("#polygoncolor").val();
    polygonwidth = $("#boardwidth").val();
    opacity = $('#popacity').val();
    console.log(polyname);
    console.log(polygoncolor);
    console.log(polygonwidth);
    console.log(parseFloat(opacity));
    if (polyname == null) {
        return false;
    }
    if (polygoncolor == null) {
        return false;
    }
    if (polygonwidth == null) {
        return false;
    }
    newstyle = new ol.style.Style({
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
    addDrawInteraction("Polygon",polyname);
    displayClose();
}
$("#polygon").click(function () {
    map.removeOverlay(helpTooltip);
    map.removeOverlay(measureTooltip);
    map.removeInteraction(draw);
    displayClose()
    $("#Menuhead span").html("面要素绘制");
    $(".MarkMenu").css("display", "block");
    $(".PolygonStyle").css("display", "block");
    $(".ant-btn-primary").unbind();
    $(".ant-btn-primary").click(bindpolygon)
    $(".ant-btn-default").unbind();
    $(".ant-btn-default").click(function () {
        displayClose();
        map.removeInteraction(draw);
    })
});

//绑定绘制圆事件
function bindcircle() {
    circlename = $("#name").val();
    polygoncolor1 = $("#circlecolor").val();
    polygonwidth1 = $("#circlewidth").val();
    opacity1 = $('#copacity').val();
    console.log(circlename);
    console.log(polygoncolor1);
    console.log(polygonwidth1);
    console.log(parseFloat(opacity1));
    if (circlename == null) {
        return false;
    }
    if (polygoncolor1 == null) {
        return false;
    }
    if (polygonwidth1 == null) {
        return false;
    }
    newstyle = new ol.style.Style({
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
    addDrawInteraction("Circle",circlename);
    displayClose();
}
$("#circle").click(function () {
    map.removeOverlay(helpTooltip);
    map.removeOverlay(measureTooltip);
    displayClose()
    map.removeInteraction(draw);
    $("#Menuhead span").html("圆形绘制");
    $(".MarkMenu").css("display", "block");
    $(".CircleStyle").css("display", "block");
    $(".ant-btn-primary").unbind();
    $(".ant-btn-primary").click(bindcircle)
    $(".ant-btn-default").unbind();
    $(".ant-btn-default").click(function () {
        displayClose();
        map.removeInteraction(draw);
    })
});

//绑定绘制矩形事件
function bindrectangle() {
    rectname = $("#name").val();
    polygoncolor2 = $("#rectcolor").val();
    polygonwidth2 = $("#rectwidth").val();
    opacity2 = $('#ropacity').val();
    console.log(rectname);
    console.log(polygoncolor2);
    console.log(polygonwidth2);
    console.log(parseFloat(opacity2));
    if (rectname == null) {
        return false;
    }
    if (polygoncolor2 == null) {
        return false;
    }
    if (polygonwidth2 == null) {
        return false;
    }
    newstyle = new ol.style.Style({
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
    addDrawInteraction("Box",rectname);
    displayClose();
}
$("#rectangle").click(function () {
    map.removeOverlay(helpTooltip);
    map.removeOverlay(measureTooltip);
    displayClose()
    map.removeInteraction(draw);
    $("#Menuhead span").html("矩形绘制");
    $(".MarkMenu").css("display", "block");
    $(".RectangleStyle").css("display", "block");
    $(".ant-btn-primary").unbind();
    $(".ant-btn-primary").click(bindrectangle)
    $(".ant-btn-default").unbind();
    $(".ant-btn-default").click(function () {
        displayClose();
        map.removeInteraction(draw);
    })
});