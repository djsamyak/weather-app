const request = require("request")

function forecast(longitude, latittude, callback) 
{
    url_weatherStack = `http://api.weatherstack.com/current?access_key=470c5c2083bbae5e1c70c843b584ce83&query=${latittude},${longitude}`

    request({url:url_weatherStack, json: true},(error,response) => {
        if (error){
            callback("Unable to connect to Weather API",undefined)
        }
        else if(response.body.error){
            callback("error",undefined)
        }
        else{
            callback(undefined, {
                Temperature: response.body.current.temperature,
                Description: response.body.current.weather_descriptions,
                Precipitation: response.body.current.precip,
                Humidity: response.body.current.humidity,
                Icon: response.body.current.weather_icons   
            })
        }
    })
}

module.exports = forecast
