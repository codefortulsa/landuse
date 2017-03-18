const fs = require("fs")
const StreamArray = require("stream-json/utils/StreamArray");
const async = require("async")
const geocode = require("./services/us-census-geocoder")

const INPUT_JSON_PATH = './data/';
const INPUT_JSON_NAME = 'SalesTaxLocations';
const INPUT_JSON_LOCATION = `${INPUT_JSON_PATH}${INPUT_JSON_NAME}.json`
const OUTPUT_JSON_LOCATION = `${INPUT_JSON_PATH}${INPUT_JSON_NAME}.ASYNC.geocoded.json`

const INPUT_FILE = StreamArray.make();
const OUTPUT_FILE = fs.createWriteStream(OUTPUT_JSON_LOCATION)

const asyncTasks = [];

INPUT_FILE.output.on("data", function({index,value}){

    const first_char = index === 0 ? '[' : ','

    const write_value = (obj)=>OUTPUT_FILE.write(`${first_char}${JSON.stringify(obj)}`)

    if(value.coordinates){
        console.log(`done: ${value.key} ${value.coordinates}`);
        write_value(value)
    } else {
        function getGeocode (callback) {
            geocode(value, function (coords) {
                value.coordinates = coords
                console.log(`geocoding ${value.key} => ${value.coordinates}`);
                write_value(value)
                callback()
            })
        }
        asyncTasks.push(getGeocode)
    }
});

INPUT_FILE.output.on("end", function(){
    async.parallel(asyncTasks, function(){
        OUTPUT_FILE.write(`]`)
        console.log("done");
    });
});


fs.createReadStream(INPUT_JSON_LOCATION).pipe(INPUT_FILE.input);
