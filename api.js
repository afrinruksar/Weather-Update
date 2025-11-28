// ACCESSING ALL THE HTML COMPONENTS REQUIRED TO PERFORM ACTIONS ON.
let button = document.querySelector('.button');
let inputcity = document.querySelector('.city');
//console.log(inputcity);
let nameVal = document.querySelector('.name');
let temp = document.querySelector('.temp');
let desc = document.querySelector('.desc');
let t = document.querySelector('.t');
let d = document.querySelector('.d');
let c = document.querySelector('.c');
let icon = document.querySelector('.weather-icon');




// ADDING EVENT LISTENER TO SEARCH BUTTON  
   button.addEventListener('click', function(){

         // Fection data from open weather API
         fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputcity.value}&units=metric&appid=f66160cb2b7a0309622e86bff6008aba`)
         .then(response => response.json())
         .then(
            displayData)
         .catch(err => alert('Wrong City name'));

         fetch(`https://api.ipgeolocation.io/timezone?apiKey=ff10445970324d9fb05d6938f121d53f&location=${inputcity.value}`)
         .then(response => response.json())
         .then(
            displaytime)
         .catch(err => alert('Wrong timezone')); 
   })

      // Function to diplay weather on html document
      const displayData=(weather)=>{
         let tp=weather.main.temp;
         temp.innerText=`${weather.main.temp}°C`
         desc.innerText=`${weather.weather[0].description}`
         
         const iconUrl=`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
         icon.src=iconUrl;
         changeBackground(weather.main.temp, weather.weather[0].main,weather.weather[0].icon.includes('n'));

         temp.classList.remove('blue','red','orange','yellow');
         if (tp<5) {
            temp.classList.add('blue');
         }else if(tp>=30&&tp<40){
            temp.classList.add('orange');
         }else if(tp>=40){
            temp.classList.add('red');
         }else{
            temp.classList.add('yellow');
         }
      }

      const displaytime=(tz)=>{
         t.innerText=`${tz.time_12}`
         d.innerText=`${tz.date}`
         c.innerText=`${tz.timezone}`
      }
// Function to change background image
const changeBackground = (temperature, weatherType,isNight) => {
   let bgUrl = '';

   if (temperature <= 0) {
      bgUrl = 'IMAGES/day-snow.gif'; // Snowy
   } else if (weatherType === 'Rain') {
      bgUrl = isnight ? 'IMAGES/night-rain.gif':'IMAGES/day-rain.gif'; // Rain
   } else if (weatherType === 'Clouds') {
      bgUrl = isNight ? 'IMAGES/night-cloud.gif':'IMAGES/day-cloud.gif'; // Cloudy
   } else if (weatherType === 'Clear') {
      bgUrl = isNight ? 'IMAGES/night-clear.gif':'IMAGES/day-clear.gif'; // Sunny
   } else if (weatherType === 'Thunderstorm') {
      bgUrl = isNight ? 'IMAGES/night-stroam.gif':'IMAGES/day-stroam.gif';//thunderstroam
   } else {
      bgUrl = 'IMAGES/home.gif'; // Default
   }

   //document.body.style.backgroundImage = bgUrl;
   document.body.style.backgroundImage = `url(${bgUrl}?t=${Date.now()})`;
   document.body.style.backgroundSize = 'cover';
   document.body.style.backgroundRepeat = 'no-repeat';
   document.body.style.backgroundPosition = 'center center';
}

//COUNTRY-STATES-CITY API
var config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries',
    ckey: 'OWhmS1JRaEU5eDVDOEpTeEIyZ0YwclJzODdMNTdBNWdLNnZUdjhvWg=='
}


var countrySelect = document.querySelector('.country'),
    stateSelect = document.querySelector('.state'),
    citySelect = document.querySelector('.city')


function loadCountries() {

    let apiEndPoint = config.cUrl

    fetch(apiEndPoint, {headers: {"X-CSCAPI-KEY": config.ckey}})
    .then(Response => Response.json())
    .then(data => {
        // console.log(data);

        data.forEach(country => {
            const option = document.createElement('option')
            option.value = country.iso2
            option.textContent = country.name 
            countrySelect.appendChild(option)
        })
    })
    .catch(error => console.error('Error loading countries:',error))

    stateSelect.disabled = true
    citySelect.disabled = true
    stateSelect.style.pointerEvents = 'none'
    citySelect.style.pointerEvents = 'none'
}


function loadStates() {
    stateSelect.disabled = false
    citySelect.disabled = true
    stateSelect.style.pointerEvents = 'auto'
    citySelect.style.pointerEvents = 'none'

    const selectedCountryCode = countrySelect.value
    // console.log(selectedCountryCode);
    stateSelect.innerHTML = '<option value="">Select State</option>' // for clearing the existing states
    citySelect.innerHTML = '<option value="">Select City</option>' // Clear existing city options

    fetch(`${config.cUrl}/${selectedCountryCode}/states`, {headers: {"X-CSCAPI-KEY": config.ckey}})
    .then(response => response.json())
    .then(data => {
        // console.log(data);

        data.forEach(state => {
            const option = document.createElement('option')
            option.value = state.iso2
            option.textContent = state.name 
            stateSelect.appendChild(option)
        })
    })
    .catch(error => console.error('Error loading countries:', error))
}


function loadCities() {
    citySelect.disabled = false
    citySelect.style.pointerEvents = 'auto'

    const selectedCountryCode = countrySelect.value
    const selectedStateCode = stateSelect.value
    //console.log(selectedCountryCode, selectedStateCode);

    citySelect.innerHTML = '<option value="">Select City</option>' // Clear existing city options

    fetch(`${config.cUrl}/${selectedCountryCode}/states/${selectedStateCode}/cities`, {headers: {"X-CSCAPI-KEY": config.ckey}})
    .then(response => response.json())
    .then(data => {
        // console.log(data);

        data.forEach(city => {
            const option = document.createElement('option')
            option.value = city.name
            option.textContent = city.name 
            citySelect.appendChild(option)
        })

    })
    console.log(citySelect.innerHTML);
}

window.onload = loadCountries

 /*
for openweathermap
{
   "coord": {
      "lon": 7.367,
      "lat": 45.133
   },
   "weather": [
      {
         "id": 501,
         "main": "Rain",
         "description": "moderate rain",
         "icon": "10d"
      }
   ],
   "base": "stations",
   "main": {
      "temp": 284.2,
      "feels_like": 282.93,
      "temp_min": 283.06,
      "temp_max": 286.82,
      "pressure": 1021,
      "humidity": 60,
      "sea_level": 1021,
      "grnd_level": 910
   },
   "visibility": 10000,
   "wind": {
      "speed": 4.09,
      "deg": 121,
      "gust": 3.47
   },
   "rain": {
      "1h": 2.73
   },
   "clouds": {
      "all": 83
   },
   "dt": 1726660758,
   "sys": {
      "type": 1,
      "id": 6736,
      "country": "IT",
      "sunrise": 1726636384,
      "sunset": 1726680975
   },
   "timezone": 7200,
   "id": 3165523,
   "name": "Province of Turin",
   "cod": 200
}                    
*/
/*
for ipgeolocation
{
  "geo": {
    "location": "London, UK",
    "country": "United Kingdom",
    "state": "England",
    "city": "London",
    "locality": "",
    "latitude": "51.50002",
    "longitude": "-0.19244"
  },
  "timezone": "Europe/London",
  "timezone_offset": 0,
  "timezone_offset_with_dst": 0,
  "date": "2024-11-07",
  "date_time": "2024-11-07 15:30:15",
  "date_time_txt": "Thursday, November 07, 2024 15:30:15",
  "date_time_wti": "Thu, 07 Nov 2024 15:30:15 +0000",
  "date_time_ymd": "2024-11-07T15:30:15+0000",
  "date_time_unix": 1730993415.244,
  "time_24": "15:30:15",
  "time_12": "03:30:15 PM",
  "week": 45,
  "month": 11,
  "year": 2024,
  "year_abbr": "24",
  "is_dst": false,
  "dst_savings": 0,
  "dst_exists": true,
  "dst_start": {
    "utc_time": "2024-03-31 TIME 01",
    "duration": "+1H",
    "gap": true,
    "dateTimeAfter": "2024-03-31 TIME 02",
    "dateTimeBefore": "2024-03-31 TIME 01",
    "overlap": false
  },
  "dst_end": {
    "utc_time": "2024-10-27 TIME 01",
    "duration": "-1H",
    "gap": false,
    "dateTimeAfter": "2024-10-27 TIME 01",
    "dateTimeBefore": "2024-10-27 TIME 02",
    "overlap": true
  }
}
*/
    
