// Use Leaflet to implement a D3 geometric transformation.

function ready() {

    mapboxgl.accessToken = 'pk.eyJ1IjoiamR1bmdhbiIsImEiOiJlOTl6MFpNIn0.-3o5vIOCjkfXd-7ibZrb8A'
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [-95.99369,36.1594],
        zoom: 8
    });

    map.on('load', ()=>{
        addSalesBoundary(map)
        addTulsaCity(map)

    })

}

if (document.readyState !== 'loading') {
  ready()
} else {
  // the document hasn't finished loading/parsing yet so let's add an event handler
  document.addEventListener('DOMContentLoaded', ready)
}
