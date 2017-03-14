const request = require('request-json');
const buildUrl = require('build-url');



const url_base ='https://geocoding.geo.census.gov/geocoder/locations/onelineaddress/'
const client = request.createClient(url_base);

function geocodeParamMaker (){
    const benchmark = 'Public_AR_Census2010'
    const format = 'json'
    return function (full_address){
        return buildUrl('', {
          queryParams: {address: full_address, benchmark, format}
        })
    }
}

censusParameters = geocodeParamMaker()


function requestGeocode (full_address){
    var path = censusParameters(full_address)

    client.get( path,
        function(err, res, body) {
            debugger
            // copy the body to a proper object
            const new_body = Object.assign({},body)

            const {x:lng,y:lat}=new_body.result.addressMatches[0].coordinates
            console.log(res.statusCode);
            console.log([lng,lat]);
        }
    )
}
