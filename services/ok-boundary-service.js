const request = require('request');
const sleep = require('system-sleep');

const SERVICE_URL = 'http://www.oklahomadata.org/boundary/1.0/boundary/'

const REQUEST_WAIT = 200

const copy = (obj)=>Object.assign({},obj)

function urlMaker (){
    // '?contains=36.15061,-95.958351&sets=municipal-boundaries'
    const sets = 'blocks'
    return function ({coordinates}){
        [lng,lat] = coordinates
        return `${SERVICE_URL}?contains=${lat},${lng}&sets=${sets}`
    }
}

const serviceURL = urlMaker()

const findCensusBlock = function (address_object,callback){
    const requestURL = serviceURL(address_object)
    request(requestURL ,
        function(error, response, body) {
            if (response.statusCode === 200){
                try {
                    body_obj = JSON.parse(body)
                    address_object.block = body_obj.objects[0].slug
                    callback(address_object)
                } catch(e) {
                    address_object.block = "Not available"
                    callback(address_object)
                }
            } else {
                address_object.block = "Not available"
                callback(address_object)
            }
        }
    )
    sleep(REQUEST_WAIT)
}

module.exports = findCensusBlock
