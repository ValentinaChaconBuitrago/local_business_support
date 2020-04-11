import React, { useState, useEffect } from "react";
import Questions from "./components/Questions.js";
import Maps from "./components/Maps.js";
import { geolocated } from "react-geolocated";
const apikey = process.env.googlemaps_apikey;
const googlemapsurl =
  "https://maps.googleapis.com/maps/api/js?key=" +
  apikey +
  "&libraries=geometry,drawing,places";
let places = [];

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  const onLogout = () => {
    fetch("/logout").then(() => setUser(null));
  };
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    const geo = navigator.geolocation.getCurrentPosition(function success(pos) {
      var crd = pos.coords;
      setLat(crd.latitude);
      setLon(crd.longitude);
      console.log(lat, "LARTTTT");
    });

    fetch("./getRestaurants")
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
          places = result;
          setIsLoaded(true);
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );

    fetch("/getUser")
      .then((res) => res.json())
      .then((user) => setUser(user));
  }, [lat, lon]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <nav class="navbar navbar-inverse">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="#">
                MicroShopping
              </a>
            </div>
            <ul class="nav navbar-nav">
              <li class="active">
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Page 1</a>
              </li>
              <li>
                <a href="#">Page 2</a>
              </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li>
                <a href="#">
                  <span class="glyphicon glyphicon-user"></span> Sign Up
                </a>
              </li>
              <li>
                <a href="#">
                  <span class="glyphicon glyphicon-log-in"></span> Login
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div>
          <div>
            <div className="container"></div>
          </div>

          <div className="row">
            <div id="storesDiv" className="col-md-6">
              <h1 id="storesTitle">stores</h1>
              <ul>
                {items.map((item) => (
                  <li key={item.name}>{item.name}</li>
                ))}
              </ul>
            </div>

            <div className="col-md-6">
              <div id="rowDiv">
                <h1>Mapa</h1>
                <Maps
                  isMarkerShown
                  googleMapURL={googlemapsurl}
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={
                    <div style={{ height: `100%`, width: `100%` }} />
                  }
                  mapElement={<div style={{ height: `80vh` }} />}
                  mar={{ lat: lat, lng: lon }}
                  tiendas={items}
                ></Maps>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
