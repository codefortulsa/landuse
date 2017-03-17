const fs = require("fs")
const csvWriter = require('csv-write-stream')

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
    if(value.coordinates){
        console.log(`done => ${value.address}`);
        OUTPUT_FILE.write(`,${JSON.stringify(value)}`)
    } else {
        console.log(`geocoding ${value.key} ${value.address} =>`);
        geocode(value.address, function (coords) {
            value.coordinates = coords
            console.log(JSON.stringify(coords));
            OUTPUT_FILE.write(`,${JSON.stringify(value)}`)
        })
    }
});

INPUT_FILE.output.on("end", function(){
    console.log("done");
});

OUTPUT_FILE.write(`[{}`)

fs.createReadStream(INPUT_JSON_LOCATION).pipe(INPUT_FILE.input);
