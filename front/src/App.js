import React, { useState, useEffect } from "react";
import Questions from "./components/Questions.js";
import Maps from "./components/Maps.js";

let places = [];
function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);

  const onLogout = () => {
    fetch("/logout").then(() => setUser(null));
  };
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
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
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div>
          <div className="container">
            <h1>Hola</h1>
          </div>
        </div>
        <div className="row">
          <div id="storesDiv" className="col-md-6">
            <h1>stores</h1>
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
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCIBfNAk_YO6MsSe2mu2JAg-Voc6bDbItU&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={
                  <div style={{ height: `100%`, width: `100%` }} />
                }
                mapElement={<div style={{ height: `80vh` }} />}
                mar={{ lat: 4.7106502, lng: -74.0493288 }}
                tiendas={items}
              ></Maps>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
