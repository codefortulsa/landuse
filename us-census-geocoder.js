const request = require('request-json');
const sleep = require('system-sleep');

const US_CENSUS_URL ='https://geocoding.geo.census.gov/geocoder/locations/address/'
const REQUEST_WAIT = 750

const copy = (obj)=>Object.assign({},obj)


function geocodeParamMaker (){
    const benchmark = 'Public_AR_Census2010'
    const format = 'json'
    const vintage = 'Current_Census2010'

    return function ({street,city,state,zip}){
        const address_params =`street=${street}&city=${city}&state=${state}&zip=${zip}`
        return `?${address_params}&benchmark=${benchmark}&format=${format}&vintage=${vintage}`
    }
}

censusParameters = geocodeParamMaker()

const client = request.createClient(US_CENSUS_URL);

const geocode = function (address_object,callback){
    const path = censusParameters(address_object)
    client.get(path ,
        function(err, res, body) {
            if (err){
                console.log(`get error: ${JSON.stringify(err)}`);
                callback([])
            } else {
                if (res.statusCode===200){
                    debugger
                    try {
                        ({result:{addressMatches:matches}} = copy(body))
                        if (matches.length>0){
                            const {x:lng,y:lat}=matches[0].coordinates
                            callback([lng,lat])
                        } else {
                            callback([])
                        }
                    } catch (e) {
                        console.log(`error: ${JSON.stringify(e)}`);
                        console.log(`response: ${JSON.stringify(res)}`);
                        callback([])
                    }
                } else {
                    callback([])
                }
            }
        }
    )
    sleep(REQUEST_WAIT)
}

module.exports = geocode
