"use strict";

const submission = document.querySelector(".submission");
const type = document.querySelector(".dropdown");
const from = document.querySelector(".dropdown2");
const distance = document.querySelector(".form__input-distace");
const to = document.querySelector(".form__input-to");
const duration = document.querySelector(".form__input-duration");
const valuecadenceOrElv = document.querySelector(".form__input-cadenceOrElv");
const logs = document.querySelector(".logs");
const allLog = document.querySelectorAll(".logs");
const mapSection = document.querySelector(".map");
const formInput = document.querySelectorAll(".form__imput");
const dropdownValue = document.querySelector(".valueChange");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btn = document.querySelector(".btn-close");
const clearLogs = document.querySelector(".btn-clear");
const loadingText = document.querySelector(".loadingText");

let lng;
let lat;
let clicklng;
let clicklat;
let typ, dis, dur, cadOrElv;
let workouts = [];
let logNumber = 0;
let map;
let distanceBetween;
let canvas;
let start = 0;
let end = 0;

class Workout {
  id = Date.now();
  #now = new Date();
  #options = { month: "long", day: "numeric" };
  date = new Intl.DateTimeFormat("en-US", this.#options).format(this.#now);

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }
}

class Cycling extends Workout {
  type = "cycling";
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.pace();
  }

  pace() {
    this.pace = this.duration / this.distance;
  }
}

class Running extends Workout {
  type = "running";
  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;
    this.speed();
  }

  speed() {
    this.speed = this.distance / (this.duration / 60);
  }
}

function getLocation() {
  loadingText.style.display = "flex";
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

function mapgl() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoianVzdC1rdXNoIiwiYSI6ImNrcWNrc3M0eDBsNjIycG5tNmllbWVrZ2oifQ.ZwkoOmSGWjAfsxjGJ8fzdA";
  map = new mapboxgl.Map({
    container: "map", // container id
    style: "mapbox://styles/mapbox/dark-v10",
    center: [lng, lat],
    zoom: 13,
  });
  return new Promise((resolve, reject) => {
    resolve(map);
    reject(new Error("Cannot load the map"));
  });
}

const clicked = function () {};

const checkTheDropdown = function () {
  const value = type.options[type.selectedIndex].text;
  const value2 = from.options[from.selectedIndex].text;

  if (value === "Running") {
    dropdownValue.textContent = "Cadence";
    valuecadenceOrElv.placeholder = "step/min";
  } else {
    dropdownValue.textContent = "Elv Gain";
    valuecadenceOrElv.placeholder = "meters";
  }
};

const showForm = function (e) {
  clicklng = e.lngLat.lng;
  clicklat = e.lngLat.lat;
  submission.style.display = "grid";
  duration.focus();
  to.value = `(${clicklng.toFixed(3)}, ${clicklat.toFixed(3)})`;
  checkTheDropdown();
};

const clearValue = function () {
  distance.value = "";
  duration.value = "";
  valuecadenceOrElv.value = "";
  submission.style.display = "none";
};

const newWorkout = function (e) {
  let workout;
  if (e.key === "Enter") {
    [typ, dis, dur, cadOrElv] = [
      type.options[type.selectedIndex].text,
      +distance.value,
      +duration.value,
      +valuecadenceOrElv.value,
    ];

    start++;
    end++;

    if (!(dis > 0 || !dur) > 0 || !cadOrElv > 0) {
      modal.classList.remove("hidden");
      overlay.classList.remove("hidden");

      btn.addEventListener("click", function () {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
        distance.focus();
      });

      return;
    }

    if (typ === "Cycling")
      workout = new Cycling([clicklng, clicklat], dis, dur, cadOrElv);
    if (typ === "Running")
      workout = new Running([clicklng, clicklat], dis, dur, cadOrElv);

    workouts.push(workout);

    renderWorkout(workout);

    toggleMarker(workout);

    clearValue();
    logNumber++;
    setLocalStorage();
  }
};

const toggleMarker = function (workout) {
  const popup = new mapboxgl.Popup({ offset: 25, anchor: "bottom" }).setText(`${
    workout.type === "cycling" ? "🚴" : "🏃‍♂️"
  }
  ${workout.type.charAt(0).toUpperCase() + workout.type.slice(1)} on ${
    workout.date
  }`);

  // create DOM element for the marker
  const el = document.createElement("div");
  el.classList.add("marker");

  // create the marker

  const marker = new mapboxgl.Marker(el, {
    // draggable: true,
  })
    .setLngLat(workout.coords)
    .setPopup(popup) // sets a popup on this marker
    .addTo(map);

  // const onDragEnd = function () {
  //   const lngLat = marker.getLngLat();
  //   console.log(lngLat.lng, lngLat.lat);
  //   showDirection([lngLat.lng, lngLat.lat]);
  // };

  // marker.on("dragend", onDragEnd);
};

const focusOnMarker = function (e) {
  const element = e.target;
  // console.log(element);

  if (!element.classList.contains("logs")) {
    const CurrentID = +element.closest(".log").getAttribute("id");
    const arrayOfID = workouts.map((workout) => workout.id).indexOf(CurrentID);
    const coordsOfMarker = workouts[arrayOfID].coords;
    map.flyTo({
      center: coordsOfMarker,
      zoom: 14,
      speed: 0.2,
    });
    // console.log(coordsOfMarker);
    showDirection(coordsOfMarker);
  }
};

const renderWorkout = function (workout) {
  logs.insertAdjacentHTML(
    "afterbegin",
    `<div id="${workout.id}"class="log log${logNumber}">
              <h2 class="run-info">${
                workout.type.charAt(0).toUpperCase() + workout.type.slice(1)
              } on ${workout.date}</h2>
              <div class="log__items">
                <span class="log__items--result">
                  🏃‍♂️ ${workout.distance} <span class="units">km</span>
                </span>
                <span class="log__items--result"
                  >⏱ ${workout.duration} <span class="units">min</span></span
                >
                <span class="log__items--result"
                  >⚡️ ${
                    workout.type === "cycling"
                      ? workout.pace.toFixed(1)
                      : workout.speed.toFixed(1)
                  }
                  <span class="units">${
                    workout.type === "cycling" ? "km/h" : "min/km"
                  }</span></span
                >
                <span class="log__items--result"
                >${workout.type === "cycling" ? "⛰" : "🦶🏼"} ${
      workout.type === "cycling" ? workout.cadence : workout.elevation
    } <span class="units">${workout.type === "cycling" ? "M" : "SPM"}</span>
              </span>
              </div>
            </div>`
  );
  if (workout.type === "running") {
    document
      .querySelector(".log")
      .classList.add("mapboxgl-popup-content-wrapper-running");
  }
  if (workout.type === "cycling") {
    document
      .querySelector(".log")
      .classList.add("mapboxgl-popup-content-wrapper-cycling");
  }
};

const showDirection = function (endPoints) {
  clearValue();
  // make an initial directions request that
  // starts and ends at the same location
  launch([lng, lat]);
  // console.log(lng, lat);

  // Add starting point to the map
  map.addLayer({
    id: `start--${start}`,
    type: "circle",
    layout: {
      visibility: "visible",
    },
    source: {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: [lng, lat],
            },
          },
        ],
      },
    },
    paint: {
      "circle-radius": 10,
      "circle-color": "#e61919",
    },
  });
  // this is where the code from the next step will go

  canvas.style.cursor = "";
  // console.log(endPoints);
  const end = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: endPoints,
        },
      },
    ],
  };
  if (map.getLayer("end")) {
    map.getSource("end").setData(end);
  } else {
    map.addLayer({
      id: `end--${end}`,
      type: "circle",
      layout: {
        visibility: "visible",
      },
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: endPoints,
              },
            },
          ],
        },
      },
    });
  }
  launch(endPoints);
  // console.log(`--------------`);
  // console.log(map);
};

(async function () {
  try {
    const value = await getLocation();
    lng = value.coords.longitude;
    lat = value.coords.latitude;
    map = await mapgl();
    let geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });
    getLocalStorage();
    // Add the control to the map.
    map.addControl(geolocate);
    canvas = map.getCanvasContainer();
    map.on("load", function () {
      geolocate;
      geolocate.trigger();
    });
    map.addControl(new mapboxgl.NavigationControl());
    loadingText.style.display = "none";
    map.on("dblclick", function (e) {
      clearValue();
      const coordsObj = e.lngLat;
      canvas.style.cursor = "";
      let coords = Object.keys(coordsObj).map(function (key) {
        return coordsObj[key];
      });

      const el = document.createElement("div");
      el.classList.add("marker");
      const marker = new mapboxgl.Marker(el, {
        draggable: true,
      })
        .setLngLat(coords)
        .addTo(map);

      const onDragEnd = function () {
        const lngLat = marker.getLngLat();
        // console.log(lngLat.lng, lngLat.lat);
        coords = [lngLat.lng, lngLat.lat];
      };

      marker.on("dragend", onDragEnd);
      // make an initial directions request that
      // starts and ends at the same location
      launch([lng, lat]);
      // console.log(lng, lat);

      // Add starting point to the map
      map.addLayer({
        id: `start`,
        type: "circle",
        layout: {
          visibility: "visible",
        },
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: [lng, lat],
                },
              },
            ],
          },
        },
        paint: {
          "circle-radius": 10,
          "circle-color": "#e61919",
        },
      });
      // this is where the code from the next step will go

      // console.log(coords);
      const end = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: coords,
            },
          },
        ],
      };
      if (map.getLayer("end")) {
        map.getSource("end").setData(end);
      } else {
        map.addLayer({
          id: `end`,
          type: "circle",
          layout: {
            visibility: "visible",
          },
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "Point",
                    coordinates: coords,
                  },
                },
              ],
            },
          },
        });
      }
      launch(coords);
      showForm(e);
    });
    submission.addEventListener("click", checkTheDropdown);
    submission.addEventListener("keydown", newWorkout);
    logs.addEventListener("click", focusOnMarker);
    clearLogs.addEventListener("click", clearLog);
  } catch (err) {
    console.error(err.message);
  }
})();

const launch = async function (end) {
  try {
    let start = [lng, lat];
    const url =
      "https://api.mapbox.com/directions/v5/mapbox/driving/" +
      start[0] +
      "," +
      start[1] +
      ";" +
      end[0] +
      "," +
      end[1] +
      "?steps=true&geometries=geojson&access_token=pk.eyJ1IjoianVzdC1rdXNoIiwiYSI6ImNrcWNrc3M0eDBsNjIycG5tNmllbWVrZ2oifQ.ZwkoOmSGWjAfsxjGJ8fzdA";

    const req1 = await fetch(url);
    if (!req1.ok) {
      throw new Error(`${req1.status}`);
    }
    const dataVar = await req1.json();
    // console.log(dataVar);
    // console.log(dataVar.routes);
    const [values] = dataVar.routes;
    // console.log(values);
    distance.value = (values.distance / 1000).toFixed(3);
    // console.log(distanceBetween);
    const route = values.geometry.coordinates;
    // console.log(route);
    const geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };
    // console.log(geojson);
    if (map.getSource("route")) {
      map.getSource("route").setData(geojson);
    } else {
      // otherwise, make a new request
      map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: geojson,
            },
          },
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#e61919",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
      // console.log(map);
    }
  } catch (err) {
    alert(err);
  }
};

const setLocalStorage = function () {
  localStorage.setItem("workouts", JSON.stringify(workouts));
};

const getLocalStorage = function () {
  let data = JSON.parse(localStorage.getItem("workouts"));
  // console.log(data);
  if (!data) return;
  workouts = data;
  if (workouts.length > 0) clearLogs.classList.remove("hidden");
  data.forEach((workout) => {
    renderWorkout(workout);
    // we will render marker in loadMap
  });
};
const clearLog = function () {
  localStorage.removeItem("workouts");
  location.reload();
};
