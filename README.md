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

* xlsx-to-json.js -- Reads the xlsx source and outputs a json array of objects for each row

* add-geocode-json.js -- Reads json array file and creates a new json array file with geocoded addresses

* json-to-csv.js -- Reads json array file and save a csv file

## Service Modules

* ok-boundary-service --- Provides findCensusBlock which takes an array with [Longitude, Latitude] and returns the census block.

```
const findCensusBlock = require('ok-boundary-service')

const coordinates = [ -95.99369, 36.1594]

findCensusBlock(coordinates, function(block){
    console.log("The coordinates are with this block: " + block)
})
```

* us-census-geocoder.js --- Provides the 'geocode' function.  Takes an address object and callback.  If successful, geocoder calls the callback with an array = [Longitude, Latitude].


```
const geocoder = require('us-census-geocoder')

const address = {street:'36 E CAMERON', city: 'TULSA', state:'OK', zip: '74103'}

geocoder(address, function(coordinates){
    console.log("Longitue is " + coordinates[0])
    console.log("Latitude is " + coordinates[1])    
})
```






### references
[US Census Geocoder API](https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.pdf)

[Use ogr2ogr to convert .shp files](https://www.bram.us/2012/03/14/convert-esri-shapefile-shp-to-geojson-json/)

[Oklahoma Boundary Service API](http://oklahomadata.org/boundary/#api)
