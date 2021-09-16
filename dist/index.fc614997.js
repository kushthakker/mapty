// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"kElen":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4e5dac8afe405db7";
module.bundle.HMR_BUNDLE_ID = "550c2c2cfc614997";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F1() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                } // Render the fancy html overlay
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
            document.body.appendChild(overlay);
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>\n          ").concat(stack, "\n        </pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>' + hint + '</div>';
            }).join(''), "\n        </div>\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') {
        reloadCSS();
        return;
    }
    var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
    if (deps) {
        var fn = new Function('require', 'module', 'exports', asset.output);
        modules[asset.id] = [
            fn,
            deps
        ];
    } else if (bundle.parent) hmrApply(bundle.parent, asset);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    return getParents(module.bundle.root, id).some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}]},["kElen"], null, "parcelRequire595f")
"use strict";
const submission = document.querySelector(".submission");
const type1 = document.querySelector(".dropdown");
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
    #options = {
        month: "long",
        day: "numeric"
    };
    date = new Intl.DateTimeFormat("en-US", this.#options).format(this.#now);
    constructor(coords, distance1, duration1){
        this.coords = coords;
        this.distance = distance1;
        this.duration = duration1;
    }
}
class Cycling extends Workout {
    type = "cycling";
    constructor(coords1, distance2, duration2, cadence){
        super(coords1, distance2, duration2);
        this.cadence = cadence;
        this.pace();
    }
    pace() {
        this.pace = this.duration / this.distance;
    }
}
class Running extends Workout {
    type = "running";
    constructor(coords2, distance3, duration3, elevation){
        super(coords2, distance3, duration3);
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
        maximumAge: 0
    };
    return new Promise((resolve, reject)=>{
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
}
function mapgl() {
    mapboxgl.accessToken = "pk.eyJ1IjoianVzdC1rdXNoIiwiYSI6ImNrcWNrc3M0eDBsNjIycG5tNmllbWVrZ2oifQ.ZwkoOmSGWjAfsxjGJ8fzdA";
    map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/dark-v10",
        center: [
            lng,
            lat
        ],
        zoom: 13
    });
    return new Promise((resolve, reject)=>{
        resolve(map);
        reject(new Error("Cannot load the map"));
    });
}
const clicked = function() {
};
const checkTheDropdown = function() {
    const value = type1.options[type1.selectedIndex].text;
    const value2 = from.options[from.selectedIndex].text;
    if (value === "Running") {
        dropdownValue.textContent = "Cadence";
        valuecadenceOrElv.placeholder = "step/min";
    } else {
        dropdownValue.textContent = "Elv Gain";
        valuecadenceOrElv.placeholder = "meters";
    }
};
const showForm = function(e) {
    clicklng = e.lngLat.lng;
    clicklat = e.lngLat.lat;
    submission.style.display = "grid";
    duration.focus();
    to.value = `(${clicklng.toFixed(3)}, ${clicklat.toFixed(3)})`;
    checkTheDropdown();
};
const clearValue = function() {
    distance.value = "";
    duration.value = "";
    valuecadenceOrElv.value = "";
    submission.style.display = "none";
};
const newWorkout = function(e) {
    let workout;
    if (e.key === "Enter") {
        [typ, dis, dur, cadOrElv] = [
            type1.options[type1.selectedIndex].text,
            +distance.value,
            +duration.value,
            +valuecadenceOrElv.value, 
        ];
        start++;
        end++;
        if (!(dis > 0 || !dur) > 0 || !cadOrElv > 0) {
            modal.classList.remove("hidden");
            overlay.classList.remove("hidden");
            btn.addEventListener("click", function() {
                modal.classList.add("hidden");
                overlay.classList.add("hidden");
                distance.focus();
            });
            return;
        }
        if (typ === "Cycling") workout = new Cycling([
            clicklng,
            clicklat
        ], dis, dur, cadOrElv);
        if (typ === "Running") workout = new Running([
            clicklng,
            clicklat
        ], dis, dur, cadOrElv);
        workouts.push(workout);
        renderWorkout(workout);
        toggleMarker(workout);
        clearValue();
        logNumber++;
        setLocalStorage();
    }
};
const toggleMarker = function(workout) {
    const popup = new mapboxgl.Popup({
        offset: 25,
        anchor: "bottom"
    }).setText(`${workout.type === "cycling" ? "🚴" : "🏃‍♂️"}\n  ${workout.type.charAt(0).toUpperCase() + workout.type.slice(1)} on ${workout.date}`);
    // create DOM element for the marker
    const el = document.createElement("div");
    el.classList.add("marker");
    // create the marker
    const marker = new mapboxgl.Marker(el, {
    }).setLngLat(workout.coords).setPopup(popup) // sets a popup on this marker
    .addTo(map);
// const onDragEnd = function () {
//   const lngLat = marker.getLngLat();
//   console.log(lngLat.lng, lngLat.lat);
//   showDirection([lngLat.lng, lngLat.lat]);
// };
// marker.on("dragend", onDragEnd);
};
const focusOnMarker = function(e) {
    const element = e.target;
    // console.log(element);
    if (!element.classList.contains("logs")) {
        const CurrentID = +element.closest(".log").getAttribute("id");
        const arrayOfID = workouts.map((workout)=>workout.id
        ).indexOf(CurrentID);
        const coordsOfMarker = workouts[arrayOfID].coords;
        map.flyTo({
            center: coordsOfMarker,
            zoom: 14,
            speed: 0.2
        });
        // console.log(coordsOfMarker);
        showDirection(coordsOfMarker);
    }
};
const renderWorkout = function(workout) {
    logs.insertAdjacentHTML("afterbegin", `<div id="${workout.id}"class="log log${logNumber}">\n              <h2 class="run-info">${workout.type.charAt(0).toUpperCase() + workout.type.slice(1)} on ${workout.date}</h2>\n              <div class="log__items">\n                <span class="log__items--result">\n                  🏃‍♂️ ${workout.distance} <span class="units">km</span>\n                </span>\n                <span class="log__items--result"\n                  >⏱ ${workout.duration} <span class="units">min</span></span\n                >\n                <span class="log__items--result"\n                  >⚡️ ${workout.type === "cycling" ? workout.pace.toFixed(1) : workout.speed.toFixed(1)}\n                  <span class="units">${workout.type === "cycling" ? "km/h" : "min/km"}</span></span\n                >\n                <span class="log__items--result"\n                >${workout.type === "cycling" ? "⛰" : "🦶🏼"} ${workout.type === "cycling" ? workout.cadence : workout.elevation} <span class="units">${workout.type === "cycling" ? "M" : "SPM"}</span>\n              </span>\n              </div>\n            </div>`);
    if (workout.type === "running") document.querySelector(".log").classList.add("mapboxgl-popup-content-wrapper-running");
    if (workout.type === "cycling") document.querySelector(".log").classList.add("mapboxgl-popup-content-wrapper-cycling");
};
const showDirection = function(endPoints) {
    clearValue();
    // make an initial directions request that
    // starts and ends at the same location
    launch([
        lng,
        lat
    ]);
    // console.log(lng, lat);
    // Add starting point to the map
    map.addLayer({
        id: `start--${start}`,
        type: "circle",
        layout: {
            visibility: "visible"
        },
        source: {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        properties: {
                        },
                        geometry: {
                            type: "Point",
                            coordinates: [
                                lng,
                                lat
                            ]
                        }
                    }, 
                ]
            }
        },
        paint: {
            "circle-radius": 10,
            "circle-color": "#e61919"
        }
    });
    // this is where the code from the next step will go
    canvas.style.cursor = "";
    // console.log(endPoints);
    const end1 = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: {
                },
                geometry: {
                    type: "Point",
                    coordinates: endPoints
                }
            }, 
        ]
    };
    if (map.getLayer("end")) map.getSource("end").setData(end1);
    else map.addLayer({
        id: `end--${end1}`,
        type: "circle",
        layout: {
            visibility: "visible"
        },
        source: {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        properties: {
                        },
                        geometry: {
                            type: "Point",
                            coordinates: endPoints
                        }
                    }, 
                ]
            }
        }
    });
    launch(endPoints);
// console.log(`--------------`);
// console.log(map);
};
(async function() {
    try {
        const value = await getLocation();
        lng = value.coords.longitude;
        lat = value.coords.latitude;
        map = await mapgl();
        let geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        });
        getLocalStorage();
        // Add the control to the map.
        map.addControl(geolocate);
        canvas = map.getCanvasContainer();
        map.on("load", function() {
            geolocate.trigger();
        });
        map.addControl(new mapboxgl.NavigationControl());
        loadingText.style.display = "none";
        map.on("dblclick", function(e) {
            clearValue();
            const coordsObj = e.lngLat;
            canvas.style.cursor = "";
            let coords3 = Object.keys(coordsObj).map(function(key) {
                return coordsObj[key];
            });
            const el = document.createElement("div");
            el.classList.add("marker");
            const marker = new mapboxgl.Marker(el, {
                draggable: true
            }).setLngLat(coords3).addTo(map);
            const onDragEnd = function() {
                const lngLat = marker.getLngLat();
                // console.log(lngLat.lng, lngLat.lat);
                coords3 = [
                    lngLat.lng,
                    lngLat.lat
                ];
            };
            marker.on("dragend", onDragEnd);
            // make an initial directions request that
            // starts and ends at the same location
            launch([
                lng,
                lat
            ]);
            // console.log(lng, lat);
            // Add starting point to the map
            map.addLayer({
                id: `start`,
                type: "circle",
                layout: {
                    visibility: "visible"
                },
                source: {
                    type: "geojson",
                    data: {
                        type: "FeatureCollection",
                        features: [
                            {
                                type: "Feature",
                                properties: {
                                },
                                geometry: {
                                    type: "Point",
                                    coordinates: [
                                        lng,
                                        lat
                                    ]
                                }
                            }, 
                        ]
                    }
                },
                paint: {
                    "circle-radius": 10,
                    "circle-color": "#e61919"
                }
            });
            // this is where the code from the next step will go
            // console.log(coords);
            const end1 = {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        properties: {
                        },
                        geometry: {
                            type: "Point",
                            coordinates: coords3
                        }
                    }, 
                ]
            };
            if (map.getLayer("end")) map.getSource("end").setData(end1);
            else map.addLayer({
                id: `end`,
                type: "circle",
                layout: {
                    visibility: "visible"
                },
                source: {
                    type: "geojson",
                    data: {
                        type: "FeatureCollection",
                        features: [
                            {
                                type: "Feature",
                                properties: {
                                },
                                geometry: {
                                    type: "Point",
                                    coordinates: coords3
                                }
                            }, 
                        ]
                    }
                }
            });
            launch(coords3);
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
const launch = async function(end1) {
    try {
        let start1 = [
            lng,
            lat
        ];
        const url = "https://api.mapbox.com/directions/v5/mapbox/driving/" + start1[0] + "," + start1[1] + ";" + end1[0] + "," + end1[1] + "?steps=true&geometries=geojson&access_token=pk.eyJ1IjoianVzdC1rdXNoIiwiYSI6ImNrcWNrc3M0eDBsNjIycG5tNmllbWVrZ2oifQ.ZwkoOmSGWjAfsxjGJ8fzdA";
        const req1 = await fetch(url);
        if (!req1.ok) throw new Error(`${req1.status}`);
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
            properties: {
            },
            geometry: {
                type: "LineString",
                coordinates: route
            }
        };
        // console.log(geojson);
        if (map.getSource("route")) map.getSource("route").setData(geojson);
        else // otherwise, make a new request
        map.addLayer({
            id: "route",
            type: "line",
            source: {
                type: "geojson",
                data: {
                    type: "Feature",
                    properties: {
                    },
                    geometry: {
                        type: "LineString",
                        coordinates: geojson
                    }
                }
            },
            layout: {
                "line-join": "round",
                "line-cap": "round"
            },
            paint: {
                "line-color": "#e61919",
                "line-width": 5,
                "line-opacity": 0.75
            }
        });
    } catch (err) {
        alert(err);
    }
};
const setLocalStorage = function() {
    localStorage.setItem("workouts", JSON.stringify(workouts));
};
const getLocalStorage = function() {
    let data = JSON.parse(localStorage.getItem("workouts"));
    // console.log(data);
    if (!data) return;
    workouts = data;
    if (workouts.length > 0) clearLogs.classList.remove("hidden");
    data.forEach((workout)=>{
        renderWorkout(workout);
    // we will render marker in loadMap
    });
};
const clearLog = function() {
    localStorage.removeItem("workouts");
    location.reload();
};

//# sourceMappingURL=index.fc614997.js.map
