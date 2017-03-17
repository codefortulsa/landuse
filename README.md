# Landuse

## Goal
Use Tulsa's sales tax information to create a map of Tulsa to allow comparison of geographic areas.

## Challenge
Data must be aggregated to make individual sales tax payments anonymous

##  Task
- [x] Get a list of all sales tax addresses
- [x] Geocode the addresses
- [] Combine points into geographic collections with at least 3 members per area
- [] Assign sales tax value to geographic areas
- [] Create map or visualization

## Install
`
npm install
`

## Utilities

* xlsx-to-json.js -- Reads the xlsx source and outputs a json array of ojects for each row

* us-census-geocoder.js --- module that provide the 'geocode' function.  Takes an address and callback.  If successful, geocoder provides an array [Longitude, Latitude].


```
const geocoder = require('us-census-geocoder')

geocoder("36 East Cameron Street Tulsa OK", function(coords){
    console.log("Longitue is " + coords[0])
    console.log("Latitude is " + coords[1])    
})
```

* add-geocode-csv.js -- reads json array file and outputs a csv with geocoded addresses

* add-geocode-json.js -- readsy json array file and outpus a new json array file with geocoded addresses





### references
[US Census Geocoder API](https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.pdf)

[Use ogr2ogr to convert .shp files](https://www.bram.us/2012/03/14/convert-esri-shapefile-shp-to-geojson-json/)
