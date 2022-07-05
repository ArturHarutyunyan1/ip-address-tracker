const form     = document.querySelector('.form')
const input    = document.querySelector('.value')
const ip       = document.querySelector('.ip')
const city     = document.querySelector('.location')
const timezone = document.querySelector('.timezone')
const isp      = document.querySelector('.isp')
const loader   = document.querySelector('.loader')

let clientIP = ''
let map      = null
let lat
let lng

async function getClientIP(){
    try {
        const res = await fetch(`https://api.ipify.org?format=json`)
        clientIP  = res
    } catch (error) {
        console.error(error);
    }
}

async function getClientIPData(){
    try {
        const res  = await fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_z21iQeHhr6AGrZcRjPNPmfIw7dYxV&ipAddress=${clientIP}`)
        const data = await res.json()
        console.log(data);
        lat = data.location.lat
        lng = data.location.lng
        updateMap(data,lat,lng)
    } catch (error) {
        console.error(error);
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    let value = input.value

    fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_NK0T54ViEPLTqUEEzgSbAh387MGgX&ipAddress=${value}`)
    .then((res) => res.json())
    .then((data) => {
        lat = data.location.lat
        lng = data.location.lng
        updateMap(data,lat, lng)
    })
})

function updateMap(data,lat,lng){
    showLoader()
    lat
    lng
    if (map !== undefined && map !== null) { map.remove();}
     map = L.map('map').setView([lat, lng], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYXJ0dXJoYXJ1dHl1bnlhbiIsImEiOiJja3p3YjVzdnc2dHdlMm5vMXlicmlsajYyIn0.tr-NCvCtkVSLGXqJP3lJmQ'
    }).addTo(map);
    let customMarker = L.icon({
        iconUrl: 'img/icon-location.svg'
    })
    let marker = L.marker([lat, lng], {icon: customMarker}).addTo(map);

    ip.innerHTML = `${data.ip}`
    city.innerHTML = `${data.location.city}, ${data.location.country}`
    timezone.innerHTML = `UTC ${data.location.timezone}`
    isp.innerHTML      = `${data.isp}`
    hideLoader()
}

function showLoader(){
    if(loader.classList.contains('.loaded')){
        loader.classList.remove('loaded')
    }
}

function hideLoader(){
    loader.classList.add('loaded')
}

getClientIP()
getClientIPData()