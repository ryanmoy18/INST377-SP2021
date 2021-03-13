function mapInit() {
  const mymap = L.map("mapid").setView([38.9897, -76.9378], 13);

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoicm1veTk5IiwiYSI6ImNrbTUzd3p5cjBhcnIyd3Bqa2Q0OWh3MncifQ.EFUpNalje7gTeli8O8uZwg",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken: "pk.eyJ1Ijoicm1veTk5IiwiYSI6ImNrbTUzd3p5cjBhcnIyd3Bqa2Q0OWh3MncifQ.EFUpNalje7gTeli8O8uZwg",
    }
  ).addTo(mymap);

  const popup = L.popup();

  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(mymap);
  }

  mymap.on("click", onMapClick);

  return mymap;
}

async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
  const form = document.querySelector("#search-form");
  const search = document.querySelector("#search");
  const targetList = docuent.querySelector(".target-list");

  const request = await fetch("/api");
  const data = await request.json();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const filtered = data.filter(
      (record) => record.zip.includes(search.value) && record.geocoded_column_1
    );
    console.table(filtered);

    filtered.forEach((item) => {
      const longLat = item.geocoded_column_1.coordinates;
      console.log("markerLongLat", longLat[0], longLat[1]);
      const marker = L.marker([[longLat[1]], longLat[0]]).addTo(mapFromLeaflet);

      const appendItem = document.createElement("li");
      appendItem.classList.add("block");
      appendItem.classList.add("list-item");
      apendItem.innerHTML =
        '<div class="list-header is-size-5">${item.name}</div><address class="is-size-6">${item.address_line_1}</address>';

      targetList.append(appendItem);
    });
  });
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;
