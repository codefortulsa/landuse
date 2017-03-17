const addTulsaCounty = (map)=>{
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
                        [-95.7646133381493,36.17032130915146],
                        [-95.76152405606167,35.91002056792948],
                        [-95.823103310521,35.90674670804935],
                        [-95.81938010240282,35.86074943519933],
                        [-96.03359824952184,35.85991823938661],
                        [-96.02926732821706,36.08407302291759],
                        [-96.29867231854539,36.085468002091474],
                        [-96.29955987715302,36.1722021584112],
                        [-96.26592040610599,36.172062598328964],
                        [-96.00808848999132,36.17235218290941],
                        [-96.00579590222615,36.43148759226432],
                        [-95.81740243139338,36.43277196981401],
                        [-95.7951159710005,36.43199402855383],
                        [-95.79673370754395,36.40299884144613],
                        [-95.81218395148097,36.40308250496982],
                        [-95.82278305794922,36.170556395882414],
                        [-95.7646133381493,36.17032130915146]
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
