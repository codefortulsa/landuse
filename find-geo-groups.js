const fs = require("fs")

const StreamArray = require("stream-json/utils/StreamArray");
const EventEmitter = require('events');
class AddressEmitter extends EventEmitter {}
const addressEmitter = new AddressEmitter();


const INPUT_JSON_PATH = './data/';
const INPUT_JSON_NAME = 'SalesTaxLocations';
const INPUT_JSON_LOCATION = `${INPUT_JSON_PATH}${INPUT_JSON_NAME}.json`
const OUTPUT_JSON_LOCATION = `${INPUT_JSON_PATH}${INPUT_JSON_NAME}.geocoded.json`


const INPUT_FILE = StreamArray.make();
const OUTPUT_FILE = fs.createWriteStream("summary.md")


let bounds = {max_lng:-95.99369, min_lng:-95.99369, max_lat:36.1594, min_lat:36.1594}

INPUT_FILE.output.on("data", function(obj){
    ({index,value:{key, state, coordinates:[lng,lat]}}=obj)
    //ignore non - OK states
    console.log(key,lat,lng);


    if (state==="OK" && (lat!=undefined) && (lng!=undefined) ){
        let {max_lng, min_lng, max_lat, min_lat} = bounds
        max_lng = max_lng >= lng ? max_lng : lng
        min_lng = min_lng <= lng ? min_lng : lng
        max_lat = max_lat <= lat ? max_lat : lat
        min_lat = min_lat >= lat ? min_lat : lat
        bounds = {max_lng, min_lng, max_lat, min_lat}
    }

});

INPUT_FILE.output.on("end", function(){
    console.log(bounds);
    let {max_lng, min_lng, max_lat, min_lat} = bounds
    console.log(`${JSON.stringify([max_lng,max_lat])},`);
    console.log(`${JSON.stringify([max_lng,min_lat])},`);
    console.log(`${JSON.stringify([min_lng,min_lat])},`);
    console.log(`${JSON.stringify([min_lng,max_lat])}`);
});


fs.createReadStream(INPUT_JSON_LOCATION).pipe(INPUT_FILE.input);
