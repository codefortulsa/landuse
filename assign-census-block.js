const fs = require("fs")
const request = require("request")
const async = require("async")
const StreamArray = require("stream-json/utils/StreamArray");
const findCensusBlock = require("./services/ok-boundary-service")

const INPUT_JSON_PATH = './data/';
const INPUT_JSON_NAME = 'SalesTaxLocations';
const INPUT_JSON_LOCATION = `${INPUT_JSON_PATH}${INPUT_JSON_NAME}.safe.json`
const OUTPUT_JSON_LOCATION = `${INPUT_JSON_PATH}${INPUT_JSON_NAME}.block.json`

const INPUT_FILE = StreamArray.make();
const OUTPUT_FILE = fs.createWriteStream(OUTPUT_JSON_LOCATION)

const asyncTasks = [];

INPUT_FILE.output.on("data", function({index,value}){
    const first_char = index === 0 ? '[' : ','
    const write_value = (obj)=>OUTPUT_FILE.write(`${first_char}${JSON.stringify(obj)}`)
    function getCensusBlock (callback) {
        findCensusBlock(value, function (result) {
            process.stdout.write(`${result.block}\n`)
            write_value(result)
            callback()
        })
    }
    asyncTasks.push(getCensusBlock)
    process.stdout.write(`${index},`)
});

INPUT_FILE.output.on("end", function(){
    console.log('\n start running');
    async.parallel(asyncTasks, function(){
        OUTPUT_FILE.write(`]`)
        console.log("done");
    });
});

fs.createReadStream(INPUT_JSON_LOCATION).pipe(INPUT_FILE.input);
