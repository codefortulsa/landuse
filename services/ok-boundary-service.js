const request = require('request');
const sleep = require('system-sleep');

const SERVICE_URL = 'http://www.oklahomadata.org/boundary/1.0/boundary/'
const REQUEST_WAIT = 200

function urlMaker (){
    // '?contains=36.15061,-95.958351&sets=municipal-boundaries'
    const sets = 'blocks'
    return function ([lng,lat]){
        return `${SERVICE_URL}?contains=${lat},${lng}&sets=${sets}`
    }
}

const serviceURL = urlMaker()

const findCensusBlock = function (coords,callback){
    // coords must be an array with [Longitude, Latitude]
    request(serviceURL(coords),
        function(error, response, body) {
            if (response.statusCode === 200){
                try {
                    debugger
                    const {objects:[{slug: block}]} = JSON.parse(body)
                    callback(block)
                } catch(e) {
                    callback("Not found")
                }
            } else {
                callback("Service error")
            }
        }
    )
    sleep(REQUEST_WAIT)
}

module.exports = findCensusBlock
