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
    while (addresses.length >= 1 ){
        let [key, address, street, street_2, CITY, state, zip] = addresses.pop()
        yield {key, address, street, street_2, city:cities[CITY], state, zip}
    }
}

const [header,...row_array] = xlsx.utils.sheet_to_json(
    workbook.Sheets[ADDRESS_SHEET], {header:1, raw:true}
)

rows = rowIterator(row_array)

for (row of rows){
    console.log(row.address);
    // geolocation code goes here

}

// console.log('Writing output file...');
// jsonfile.writeFile(OUTPUT_JSON_LOCATION, data, function (err) {
//     console.error(err);
// });
