/***
 * Converts a source spreadsheet with address information into a jsonfile with
 * geolocation information added
 */

const xlsx = require('xlsx');
const jsonfile = require('jsonfile');

//Spreadsheet data
const INPUT_SPREADSHEET_LOCATION = './SalesTaxLocations.xlsx';
const OUTPUT_JSON_LOCATION = './SalesTaxLocations.json';
const workbook = xlsx.readFile(INPUT_SPREADSHEET_LOCATION);
const ADDRESS_SHEET = 'prp_PermitAdresses'

function *rowIterator(xl_array){
    const cities ={
        "TULSA" : "Sapulpa",
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
        "SOUTH" : "?",
        "HOUST" : "?",
        "PRATT" : "Pratt",
        "LEONA" : "?",
        "OOLOG" : "Oolaga",
        "LIBER" : "?",
        "CLEVE" : "?",
        "CLARE" : "Claremore",
        "HARRA" : "?",
        "SALIN" : "?",
        "TUSLA" : "Tulsa",
        "MCALE" : "?",
        "EL RE" : "??",
        "TULS"  : "Tulsa"
    }
    while (xl_array.length >= 1 ){
        let [key, address, street, street_2, CITY, state, zip] = xl_array.shift()
        yield {key, address, street, street_2, city:cities[CITY], state, zip}
    }
}

const [header,...row_array] = xlsx.utils.sheet_to_json(
    workbook.Sheets[ADDRESS_SHEET], {header:1, raw:true}
)

rows = rowIterator(row_array)

for (row of rows){
    console.log(row);
    // geolocation code goes here

}

// console.log('Writing output file...');
// jsonfile.writeFile(OUTPUT_JSON_LOCATION, data, function (err) {
//     console.error(err);
// });
