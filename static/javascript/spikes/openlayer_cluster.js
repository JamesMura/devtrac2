var cluster = {};
cluster.Long = 32.5811;
cluster.Lat = 0.3136;
cluster.zoom = 7;
cluster.map = null;
cluster.baseLayer = null;
cluster.lowRule = null;
cluster.middleRule = null;
cluster.vectorLayer = null;
cluster.highRule = null;
cluster.styles = null;
cluster.ug_projects_url = '/static/javascript/ug_projects.json';
cluster.world_cities_url = '/static/javascript/world_cities.json';
cluster.ug_towns_url = '/static/javascript/ug_towns.json';

cluster.init = function(){

	this.load = function(){
     cluster.map = new OpenLayers.Map("map");
     cluster.baseLayer = new OpenLayers.Layer.OSM();
     cluster.map.addLayer(cluster.baseLayer);
     var initial_location = new OpenLayers.LonLat(cluster.Long, cluster.Lat);

     initial_location.transform(new OpenLayers.Projection("EPSG:4326"),
     	new OpenLayers.Projection("EPSG:900913"));

     cluster.map.setCenter(initial_location, cluster.zoom);
     //cluster.map.addControl(new OpenLayers.Control.LayerSwitcher());

	}

	this.addLayer = function(vector){
     cluster.map.addLayer(vector);
	}
    this.addControl = function(control){
        cluster.map.addControl(control);
    }
}

cluster.getColors = function(){

var colors = {
                low: "rgb(181, 226, 140)",
                middle: "rgb(241, 211, 87)",
                high: "rgb(253, 156, 115)"
            };

            return colors;
}

cluster.tiles = function(){

var map = cluster.map;
var format = 'image/png';

  var tiles = new OpenLayers.Layer.WMS(
            "geonode:uganda_districts_2010 - Tiled", "http://ec2-54-218-182-219.us-west-2.compute.amazonaws.com/geoserver/geonode/wms",
            {
                LAYERS: 'geonode:uganda_districts_2010',
                STYLES: '',
                format: format,
                tiled: true,
                tilesOrigin : map.maxExtent.left + ',' + map.maxExtent.bottom
            },
            {
                buffer: 0,
                displayOutsideMaxExtent: true,
                isBaseLayer: false,
                yx : {'EPSG:4326' : true}
            }
        );

  return tiles;
}

cluster.setRules = function(){

	var colors = cluster.getColors();
cluster.lowRule = new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.LESS_THAN,
                    property: "count",
                    value: 15
                }),
                symbolizer: {
                    fillColor: colors.low,
                    fillOpacity: 0.9,
                    strokeColor: colors.low,
                    strokeOpacity: 0.5,
                    strokeWidth: 12,
                    pointRadius: 10,
                    label: "${count}",
                    labelOutlineWidth: 1,
                    fontColor: "#ffffff",
                    fontOpacity: 0.8,
                    fontSize: "12px"
                }
            });

cluster.middleRule = new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.BETWEEN,
                    property: "count",
                    lowerBoundary: 15,
                    upperBoundary: 50
                }),
                symbolizer: {
                    fillColor: colors.middle,
                    fillOpacity: 0.9,
                    strokeColor: colors.middle,
                    strokeOpacity: 0.5,
                    strokeWidth: 12,
                    pointRadius: 15,
                    label: "${count}",
                    labelOutlineWidth: 1,
                    fontColor: "#ffffff",
                    fontOpacity: 0.8,
                    fontSize: "12px"
                }
            });

cluster.highRule = new OpenLayers.Rule({
                filter: new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.GREATER_THAN,
                    property: "count",
                    value: 50
                }),
                symbolizer: {
                    fillColor: colors.high,
                    fillOpacity: 0.9,
                    strokeColor: colors.high,
                    strokeOpacity: 0.5,
                    strokeWidth: 12,
                    pointRadius: 20,
                    label: "${count}",
                    labelOutlineWidth: 1,
                    fontColor: "#ffffff",
                    fontOpacity: 0.8,
                    fontSize: "12px"
                }
            });

}

cluster.vectorLayer = function(){

 cluster.setRules();
 cluster.applyRules();

 var vector = new OpenLayers.Layer.Vector("Features", {
                protocol: new OpenLayers.Protocol.HTTP({
                    url: cluster.ug_projects_url,
                    format: new OpenLayers.Format.GeoJSON()
                }),
                renderers: ['Canvas','SVG'],
                strategies: [
                    new OpenLayers.Strategy.Fixed(),
                    new OpenLayers.Strategy.AnimatedCluster({
                        distance: 45,
                        animationMethod: OpenLayers.Easing.Expo.easeOut,
                        animationDuration: 10
                    })
                ],
                styleMap:  new OpenLayers.StyleMap(cluster.styles)
            });

 return vector;

}

cluster.control = function(layer){
 var featureControl = new OpenLayers.Control.SelectFeature(layer, {
                hover: true,
                highlightOnly: true,
                eventListeners: {
                    beforefeaturehighlighted: cluster.featureProperties,
                }
            });

return featureControl;
}

cluster.featureProperties = function(e){
var el = e.type,feature = e.feature.id;
cluster.getDescription(e.feature.cluster[0].data);

}
cluster.applyRules = function(){
	 cluster.styles = new OpenLayers.Style(null, {
                rules: [cluster.lowRule, cluster.middleRule, cluster.highRule]
            });
}

cluster.getDescription = function(data){
var table = "<table>";
    table += "<tr><td>"+data.geoname+"</td></tr>";
    table += "<tr><td>"+data.results+"</td></tr>";
    table += "<tr><td>"+data.developmen+"</td></tr>";
    table += "<tr><td>"+data["mjsector 1"] +"</td></tr>";
    table +="</table>";

 $("#description").html(table);
}

$(function(){
	var clusters = new cluster.init();
	clusters.load();
    var layer = cluster.vectorLayer();
  //clusters.addLayer(cluster.tiles())
     var ctrl = cluster.control(layer);
    clusters.addLayer(layer);
    clusters.addControl(ctrl);
    ctrl.activate();
	

});



