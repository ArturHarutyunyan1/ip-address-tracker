const inputForm = document.querySelector('.form')
const inputValue = document.querySelector('#ipAddress')
const currentIP = document.querySelector('.currentIP')
const currentLocation = document.querySelector('.currentLocation')
const currentTimeZone = document.querySelector('.currentTimezone')
const currentISP = document.querySelector('.currentIsp')

inputForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_XEzVrz8JJfWUBeOcbiaZliva9S9sF&ipAddress=${inputValue.value}`)
    .then((res) => res.json())
    .then((data) => updateMap(data))
})

function updateMap(data){
    let {lat} = data.location
    let {lng} = data.location
    map.setView([lat, lng], 13)
    L.marker([lat, lng], {icon: customMarker}).addTo(map)
    currentIP.innerHTML = `${data.ip}`
    currentLocation.innerHTML = `${data.location.city}, ${data.location.country}`
    currentTimeZone.innerHTML = `UTC ${data.location.timezone}`
    currentISP.innerHTML = `${data.isp}`
}

let lat = 51.50853
let lng = -0.12574
let map = L.map('map').setView([lat, lng], 13);
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
