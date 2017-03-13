// Use Leaflet to implement a D3 geometric transformation.

function ready() {

    mapboxgl.accessToken = 'pk.eyJ1IjoiamR1bmdhbiIsImEiOiJlOTl6MFpNIn0.-3o5vIOCjkfXd-7ibZrb8A'
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [-95.993697,36.159097],
        zoom: 8
    });

    map.on('load', ()=>{addTulsaCounty(map)})

    // const svg = d3.select(map.getPanes().overlayPane).append("svg")
    // const g = svg.append("g").attr("class", "leaflet-zoom-hide")

    // const L = mapboxgl
    // const collections = tulsa_county
    //
    // function projectPoint(x, y) {
    //     var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    //     this.stream.point(point.x, point.y);
    // };
    //
    // var transform = d3.geoTransform({
    //     point: projectPoint
    // });
    //
    // var path = d3.geoPath().projection(transform)
    //
    // bounds = path.bounds(tulsa_county);
    //
    // // Reposition the SVG to cover the features.
    // function reset() {
    //     var topLeft = bounds[0],
    //         bottomRight = bounds[1];
    //
    //     svg.attr("width", bottomRight[0] - topLeft[0])
    //         .attr("height", bottomRight[1] - topLeft[1])
    //         .style("left", topLeft[0] + "px")
    //         .style("top", topLeft[1] + "px");
    //     g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
    //     counties.attr("d", path);
    // };

//     map.on("viewreset", reset);
//
}

if (document.readyState !== 'loading') {
  ready()
} else {
  // the document hasn't finished loading/parsing yet so let's add an event handler
  document.addEventListener('DOMContentLoaded', ready)
}
