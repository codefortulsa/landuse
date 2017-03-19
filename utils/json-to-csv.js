const fs = require("fs")

const StreamArray = require("stream-json/utils/StreamArray");
const csvWriter = require('csv-write-stream')


const DATH_PATH = './data/';
const INPUT_JSON_NAME = 'SalesTaxLocations';
const INPUT_JSON_FILE = `${DATH_PATH}${INPUT_JSON_NAME}.json`
const OUTPUT_CSV_FILE = `${DATH_PATH}${INPUT_JSON_NAME}.csv`

const INPUT_FILE = StreamArray.make();

const writer = csvWriter()
writer.pipe(fs.createWriteStream(OUTPUT_CSV_FILE))

INPUT_FILE.output.on("data", function({value}){
    [lng,lat] = value.coordinates
    Object.assign(value,{lng,lat})
    writer.write(value)
});

INPUT_FILE.output.on("end", function(){
    writer.end()
});

fs.createReadStream(INPUT_JSON_FILE).pipe(INPUT_FILE.input);
