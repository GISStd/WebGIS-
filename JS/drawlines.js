newstyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new ol.style.Stroke({
        color: 'rgba(255, 255, 255, 0.2)',
        lineDash: [10, 10],
        width: 2
    })
})
$("#line").click(function () {
    map.removeInteraction(draw);
    map.un('click', handle);
    $(".ant-btn-primary").click(function () {
        name = $("#name").val();
        linecolor = $("#linecolor").val();
        linewidth = $("#linewidth").val();
        console.log(name);
        console.log(linecolor);
        console.log(linewidth);
        if (name == null) {
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
        displayClose();
        map.removeInteraction(draw);
    })
    $(".ant-btn-default").click(function () {
        displayClose();
        map.removeInteraction(draw);
    })
    LineDraw();
})

function displayPolygon() {
    displayClose();
    $(".MarkMenu").css("display", "block");
    $(".PolygonStyle").css("display", "block");
}
//根据绘制类型进行交互绘制图形处理
function LineDraw() {
    console.log('开始绘制线要素');
    var value = "LineString"; //绘制类型
    //实例化交互绘制类对象并添加到地图容器中
    draw = new ol.interaction.Draw({
        source: source, //绘制层数据源
        type: /** @type {ol.geom.GeometryType} */(value), //几何图形类型
        style: newstyle
    });
    map.addInteraction(draw);
    var listener;
    //绑定交互绘制工具开始绘制的事件
    draw.on('drawstart',
        function (evt) {
            // set sketch
            sketch = evt.feature; //绘制的要素
        }, this)
    draw.on('drawend',
        function (evt) {
            displayClose();
            $(".MarkMenu").css("display", "block");
            $(".LineStyle").css("display", "block");
            sketch.setStyle(newstyle);
            sketch = null;
        }, this)
}