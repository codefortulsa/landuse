const fs = require("fs")
const EventEmitter = require('events');

class AddressEmitter extends EventEmitter {}

const addressEmitter = new AddressEmitter();

const makeSource = require("stream-json");
const request = require('request-json');
const buildUrl = require('build-url');

const StreamArray = require("stream-json/utils/StreamArray");
const sleep = require('system-sleep');


const url_base ='https://geocoding.geo.census.gov/geocoder/locations/onelineaddress/'

const copy = (obj)=>Object.assign({},obj)

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

const client = request.createClient(url_base);

const INPUT_JSON_PATH = './data/';
const INPUT_JSON_NAME = 'SalesTaxLocations';
const INPUT_JSON_LOCATION = `${IINPUT_JSON_PATH}${INPUT_JSON_NAME}.json`
const OUTPUT_JSON_LOCATION = `${IINPUT_JSON_PATH}${INPUT_JSON_NAME}.geocoded.json`
const INPUT_FILE = StreamArray.make();
const OUTPUT_FILE = fs.createWriteStream(OUTPUT_JSON_LOCATION)


addressEmitter.on('noCoords', function(vendor) {
    const path = censusParameters(vendor.address)
    let result, matches

    client.get( path,
        function(err, res, body) {
            debugger
            if (err){
                console.log(`get error: ${JSON.stringify(err)}`);

            } else {
                if (res.statusCode===200){
                    ({result:{addressMatches:matches}} = copy(body))
                    try {
                        if (matches.length>0){
                            const {x:lng,y:lat}=matches[0].coordinates
                            vendor['lat']=lat
                            vendor['lng']=lng
                            console.log(`key:${vendor.key} ${vendor.address}`)
                            CSV_FILE.write(vendor)
                        }
                    } catch (e) {
                        console.log(`error: ${JSON.stringify(e)}`);
                        console.log(`response: ${JSON.stringify(resp)}`);
                    }
                }
            }
        }
    )
    // CSV_FILE.end()
});


INPUT_FILE.output.on("data", function(object){
    if(!object.value.coords){
        addressEmitter.emit('noCoords', object.value);
        sleep(500)
    }
});

INPUT_FILE.output.on("end", function(){
    console.log("done");
});

fs.createReadStream(INPUT_JSON_LOCATION).pipe(INPUT_FILE.input);
