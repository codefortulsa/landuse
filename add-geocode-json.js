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
const OUTPUT_FILE = fs.createWriteStream(OUTPUT_JSON_LOCATION)

const geocode = require("./us-census-geocoder")


INPUT_FILE.output.on("data", function({index,value}){

    write_value = (obj)=>OUTPUT_FILE.write(`,${JSON.stringify(obj)}`)

    if(value.coordinates.length>0){
        console.log(`done: ${value.key} ${value.coordinates}`);
        write_value(value)
    } else {
        geocode(value, function (coords) {
            value.coordinates = coords
            console.log(`geocoding ${value.key} => ${value.coordinates}`);
            write_value(value)
        })
    }
});

INPUT_FILE.output.on("end", function(){
    console.log("done");
});

OUTPUT_FILE.write(`[{}`)

fs.createReadStream(INPUT_JSON_LOCATION).pipe(INPUT_FILE.input);
