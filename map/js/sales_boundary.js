const addSalesBoundary = (map)=>{
    county_layer = {
        'id': 'tulsa_county',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    "coordinates": [[
                        [-95.6149,34.9315],
                        [-97.86725,34.9315],
                        [-97.86725,36.445934],
                        [-95.6149,36.445934]
                    ]],
                }
            }
        },
        'layout':  {visibility: 'visible'},
        'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.1
            // 'line-color': '#088'
        }
    }

    map.addLayer(county_layer);

}
