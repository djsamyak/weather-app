const express = require("express")
const path = require("path")
const hbs = require("hbs")

//JS Files
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express
const publicDirectoryPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

//HandleBar Setup
app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)

//Express Public directory setup
app.use(express.static(publicDirectoryPath))

app.get("",(req,res) => {
    res.render("index",{
        title: "Home Page",
        headerContent: "Weather App"
    })
})

app.get("/about",(req,res) => {
    res.render("about",{
        title: "About Us",
        headerContent: "About Page"
    })
})

app.get("/help",(req,res) => {
    res.render("help",{
        title: "Help Page",
        headerContent: "Helpful Information"
    })
})

app.get("/weather",(req,res) => {
    if(!req.query.address)
        res.send({
            error: "Address not present"
        })
    else{
        geocode(req.query.address,(error,response) => {
            if(error)
                res.send({error:error})

            else{

                forecast(response.Longitiude, response.Latitude, (error, data) => {
                    if(error)
                        res.send({error:error})
                    res.send({
                        location: response.Location,
                        description: data.Description,
                        temperature: data.Temperature,
                        chance_of_rain: data.Precipitation,
                        humidity_percentage: data.Humidity,
                        icon: data.Icon
                    })
                    
                  })
            }
            
        })
        
    }
        
})

app.get("/help/*",(req,res) => {
    res.render("404",{
        headerContent: "Help page not found"
    })
})

app.get("*",(req,res) => {
    res.render("404",{
        headerContent: "Error 404: Page not found"
    })
})

app.listen(port,() => {
    console.log("Server is RUNNING at Port " + port)
})