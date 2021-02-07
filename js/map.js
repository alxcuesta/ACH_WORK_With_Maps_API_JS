var mapMain;

// @formatter:off

//añadir os require uno a uno con comas, con el dato que da el constructor en la API
require([
        "esri/map",
        "esri/geometry/Extent",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/FeatureLayer",
        "esri/dijit/BasemapToggle",
        "esri/dijit/Scalebar",
        "esri/dijit/Legend",
        "dojo/ready",
        "dojo/parser",
        "dojo/on",
        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane"],

    function (Map, Extent,ArcGISDynamicMapServiceLayer, FeatureLayer, BasemapToggle, Scalebar, Legend,
              ready, parser, on,
              BorderContainer, ContentPane) {
// @formatter:on

        // Wait until DOM is ready *and* all outstanding require() calls have been resolved
        ready(function () {

            // Parse DOM nodes decorated with the data-dojo-type attribute
            parser.parse();

//añadir la extenison, extrayendo de la consola, desde explorador previamente centrar 'a ojo' el encuadre deseado
// comentario extra preexistente Reference: https://developers.arcgis.com/javascript/jssamples/fl_any_projection.html

             var extentInitial = new Extent({
                "xmin":-14183864.236194363,
                "ymin":3208661.388447105,
                "xmax":-13489204.523138864,
                "ymax":5698674.021864344,
                "spatialReference":{
                    "wkid":102100
                } 
            });

//crear el mapa y escribir las opciones disponibles
            mapMain = new Map("cpCenter", {
                basemap : "satellite",
                extent : extentInitial,
                logo : false,
            });

//añadir una capa desde mapserver de arcgis que ya existe previamente
            var lyrUSA = new ArcGISDynamicMapServiceLayer ("https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",{
                opacity : 0.5 
            });
          
// añadir la capa Earthquake 
            var lyrQuake = new FeatureLayer ("https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer/0");
            lyrQuake.setDefinitionExpression ("magnitude>= 2.0");

//este comentario preexistente es una de las formas iniciales de introducir los mapMain. Los comento porque vamos a poner una forma más compacta 
            
            mapMain.addLayer (lyrUSA);
            mapMain.addLayer (lyrQuake);
            
            /*
            mapMain.addLayer([lyrUSA, lyrQuake]);
            */

//añadir la miniatura-widget de mapa que cambia de orto a top (arriba derecha)
            var toggle = new BasemapToggle ({
                map : mapMain,
                basemap : "topo"
            }, "BasemapToggle");
            toggle.startup ();

//añadir una barra de escala desde widget, con dijit (vigilar mayusculas que predetermina la API)
             var dijitScalebar = new Scalebar ({
                 map : mapMain,
                 scalebarUnit : "dual",
                 attachTo : "bottom-left", 
             });

//añadir una leyenda con un widget


//descomentar y completat este:
            mapMain.on("layer-add-result", function() {
                var dijitLegend = new Legend ({
                    map : mapMain, 
                    arrangement : Legend.ALIGN_RIGHT
                }, "divLegend");
 //descomentamos el 'stub' por que el widget de leyenda se ha de inicializar por programa de forma expresa
                dijitLegend.startup ();
            }); // stub
        });
    });
