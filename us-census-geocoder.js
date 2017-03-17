const request = require('request-json');
const sleep = require('system-sleep');

const copy = (obj)=>Object.assign({},obj)
const REQUEST_WAIT = 250

const US_CENSUS_URL ='https://geocoding.geo.census.gov/geocoder/locations/onelineaddress/'
const client = request.createClient(US_CENSUS_URL);

function geocodeParamMaker (){
    const benchmark = 'Public_AR_Census2010'
    const format = 'json'
    return function (full_address){
        return `?address=${full_address}&benchmark=${benchmark}&format=${format}`
    }
}
censusParameters = geocodeParamMaker()

const geocode = function (full_address,callback){
    const path = censusParameters(full_address)
    client.get(path ,
        function(err, res, body) {
            if (err){
                console.log(`get error: ${JSON.stringify(err)}`);
            } else {
                if (res.statusCode===200){
                    ({result:{addressMatches:matches}} = copy(body))
                    try {
                        if (matches.length>0){
                            const {x:lng,y:lat}=matches[0].coordinates
                            callback([lng,lat])
                        }
                    } catch (e) {
                        console.log(`error: ${JSON.stringify(e)}`);
                        console.log(`response: ${JSON.stringify(res)}`);
                        callback([])
                    }
                }
            }
        }
    )
    sleep(REQUEST_WAIT)
}

module.exports = geocode
