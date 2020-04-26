const request = require("request")

function geocode(address, callback)
{
    const url_mapbox=`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZGpzYW15YWsiLCJhIjoiY2s5YWF1ZXFxMDd5bzNzdDY1bGowd3V3bSJ9.GMKoSS8W0owy42xrlYzZ_A`
    
    request({url:url_mapbox,json:true},(error,response) => {
        if(error){
            callback("Unable to connect to Mapbox API",undefined)
        }
        else if(response.body.features.length===0){
            callback("Unable to find location. Try another search.", undefined)
        }
        else{
            callback(undefined, {
                Latitude: response.body.features[0].center[1],
                Longitiude: response.body.features[0].center[0],
                Location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode