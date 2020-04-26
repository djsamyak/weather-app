const weatherForm = document.querySelector("form")
const searchContent = document.getElementById("locationEntry") 

const error1 = document.getElementById("error") 
const messageBox1 = document.getElementById("messageBox")
const location1 = document.getElementById("location") 
const desc1 = document.getElementById("desc") 
const icon1 = document.getElementById("icon") 
const temp1 = document.getElementById("temp") 
const rain1 = document.getElementById("rain") 
const humidity1 = document.getElementById("humidity")
const closeButton1 = document.getElementById("closeButton")  

function findLocation(x){
    fetch(`http://localhost:3000/weather?address=${x}`).then((response) => {
    response.json().then((data) => {
        if(data.error){
            error1.textContent = `error: ${data.error}`
        }
        else{
            location1.textContent = data.location
            desc1.textContent = data.description
            icon1.innerHTML = `<img src="${data.icon}">`
            temp1.textContent = `Temperature: ${data.temperature}°C`
            rain1.textContent = `Chances of Rain: ${data.chance_of_rain}%`
            humidity1.textContent = `Humidity: ${data.humidity_percentage}%`
            messageBox1.style.display="inherit"
        }
    })
})
}

weatherForm.addEventListener("submit" , (e) => {
    e.preventDefault()
    console.log(searchContent.value)
    findLocation(searchContent.value)
})

closeButton1.addEventListener("click", (e) => {
    messageBox1.style.display="none";
},false)