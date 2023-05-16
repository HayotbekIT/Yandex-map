console.clear()

const container = document.querySelector("#resulte-js")
const formContainer = document.querySelector("#form-js")
const ipAddress = container.querySelector("#ipAddress-js")
const ipLocation = container.querySelector("#location-js")
const timezone = container.querySelector("#timezone-js")
const isp = container.querySelector("#isp-js")

const input = formContainer.querySelector("#input-js")
const button = formContainer.querySelector("#button-js")

ymaps.ready(init);
function init() {

    let lat = 34.061401, lon = -118.081619

    button.addEventListener("click", () => {
        let IP = input.value.trim()

        const GetIP = (ip = "192.212.174.101") => {
            fetch("https://freeipapi.com/api/json/" + ip).then(response => response.json()).then((data) => {

                ipAddress.textContent = data.ipAddress
                ipLocation.textContent = `${data.regionName}, ${data.countryCode} ${data.zipCode}`
                timezone.textContent = `UTC ${data.timeZone}`

                initMap(lat, lon)

            })
        }

        GetIP(IP)
        initMap(lat, lon)
    })

    const initMap = (lat, lon) => {

        const myMap = new ymaps.Map("ip-map", {
            center: [lat, lon],
            zoom: 11
        });

        const myPoint = new ymaps.GeoObject({
            geometry: {
                type: "Point",
                coordinates: [lat, lon]
            }
        })

        myMap.geoObjects.add(myPoint)
    }
    initMap(lat, lon)
}