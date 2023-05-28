console.clear()

const container = document.querySelector("#resulte-js")
const formContainer = document.querySelector("#form-js")
const mapholder = document.querySelector("#ip-map")

const ipAddress = container.querySelector("#ipAddress-js")
const ipLocation = container.querySelector("#location-js")
const timezone = container.querySelector("#timezone-js")
const time = container.querySelector("#time-js")

const input = formContainer.querySelector("#input-js")
const button = formContainer.querySelector("#button-js")

const API = "https://freeipapi.com/api/json/"

const date = new Date()

const GetIPFunc = (ip = "") => {
    fetch(API + ip).then(response => response.json()).then(data => {

        localStorage.setItem("geoInfo", JSON.stringify(data))

    }).catch(error => console.error("Код ошибка \n\n", error))
}

const GetInfo = () => {
    const geoInfo = JSON.parse(localStorage.getItem("geoInfo"))

    ipAddress.textContent = geoInfo.ipAddress

    ipLocation.textContent = `${geoInfo.regionName}, ${geoInfo.countryCode} ${geoInfo.zipCode}`

    timezone.textContent = `UTC ${geoInfo.timeZone}`

    time.textContent = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    

    mapholder.innerHTML = ""

    ymaps.ready(init)

    function init() {
        const createMap = new ymaps.Map("ip-map", {
            zoom: 10,
            center: [geoInfo.latitude, geoInfo.longitude]
        })

        const createPoint = new ymaps.GeoObject({
            geometry: {
                type: "Point",
                coordinates: [geoInfo.latitude, geoInfo.longitude]
            }
        })

        createMap.geoObjects.add(createPoint)
    }

}

input.addEventListener("input", () => {
    const IPvalue = input.value.trim()
    GetIPFunc(IPvalue)
    GetInfo()
})