const getData = async () => {
  const response = await fetch('/api');
  const json = await response.json();

  for (items of json) {
    const root = document.createElement('div');
    const latlon = document.createElement('div');
    const date = document.createElement('div');

    latlon.textContent = `lattitude: ${items.lat}°, lonitude: ${items.lon}°`
    const dateString = new Date(items.timestamp).toLocaleString();
    date.textContent = dateString;
    root.append(latlon, date);
    root.id = 'root';
    document.body.append(root);
  }
  console.log(json);
}
getData();