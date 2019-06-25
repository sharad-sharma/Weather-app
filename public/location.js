const poster = async (lat , lon) => {
  const data = { lat, lon };

    const options = {
      method: 'POST',
      credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
    const response = await fetch('/api', options);
    const json = await response.json();
    console.log(json);
}

// Getting geolocation
if ("geolocation" in navigator) {
  console.log("geolocation available");
  navigator.geolocation.getCurrentPosition(async position => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    document.getElementById('latitude').textContent = lat; 
    document.getElementById('longitude').textContent = lon;

    const api_url = `/weather/${lat},${lon}`;
    const response = await fetch(api_url);
    const json = await response.json();
    document.getElementById('weather').textContent = json.currently.summary;
    document.getElementById('temp').textContent = (json.currently.temperature - 32) / 1.8;
    // Submit Event
    let checkIn = document.getElementById('checkIn');
    checkIn.addEventListener('click', async event => {poster(lat, lon)});
  });
} else {
  console.log("geolocation not available");
}