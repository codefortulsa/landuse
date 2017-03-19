/***
 * Converts a source spreadsheet with address information into a jsonfile with
 * geolocation information added
 */
var fs = require("fs")
const xlsx = require('xlsx');

//Spreadsheet data
const INPUT_SPREADSHEET_LOCATION = './data/SalesTaxLocations.xlsx';
const OUTPUT_JSON_LOCATION = './data/SalesTaxLocations.json';
const workbook = xlsx.readFile(INPUT_SPREADSHEET_LOCATION);
const ADDRESS_SHEET = 'prp_PermitAdresses'

function *rowIterator(addresses){
    const cities ={
        "TULSA" : "Tulsa",
        "BIXBY" : "Bixby",
        "BROKE" : "Broken Arrow",
        "SAND"  : "Sand Springs",
        "SAPUL" : "Sapulpa",
        "JENKS" : "Jenks",
        "OWASS" : "Owasso",
        "GLENP" : "Glenpool",
        "SPERR" : "Sperry",
        "COLLI" : "Collinsville",
        "SKIAT" : "Skiatook",
        "OAKHU" : "Oakhurst",
        "MOUND" : "Mounds",
        "SANDS" : "Sand Springs",
        "VINIT" : "Vinita",
        "CATOO" : "Catoosa",
        "SOUTH" : "South Lake",
        "HOUST" : "Houston",
        "PRATT" : "Pratt",
        "LEONA" : "Leonard",
        "OOLOG" : "Oologah",
        "LIBER" : "Liberty",
        "CLEVE" : "Cleveland",
        "CLARE" : "Claremore",
        "HARRA" : "Harrah",
        "SALIN" : "Salina",
        "TUSLA" : "Tulsa",
        "MCALE" : "McAlester",
        "EL RE" : "El Reno",
        "TULS"  : "Tulsa"
    }
    while (addresses.length >= 14200 ){
        let [key, address, street, street_2, CITY, state, zip] = addresses.pop()
        yield {key, address, street, street_2, city:cities[CITY], state, zip}
    }
}

const [header,...row_array] = xlsx.utils.sheet_to_json(
    workbook.Sheets[ADDRESS_SHEET], {header:1, raw:true}
)

rows = rowIterator(row_array)


var JSONfile = fs.createWriteStream(OUTPUT_JSON_LOCATION)

//get started without a comma
JSONfile.write(`[${ JSON.stringify(rows.next().value) }`)

let done = false
let row

do {
    ( {value: row, done} = rows.next() )
    if (done) {
        JSONfile.write(']');
        JSONfile.end();
    } else {
        JSONfile.write(`,${JSON.stringify(row)}`)
    }
} while (!done)
