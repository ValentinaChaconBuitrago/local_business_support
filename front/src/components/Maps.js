import {
  withGoogleMap,
  GoogleMap,
  GoogleMaps,
  Marker,
  InfoWindow,
} from "react-google-maps";
import React, { useState, useEffect } from "react";

const Maps = withGoogleMap((props) => {
  const [selected, setSelected] = useState(null);
  console.log("tiendas", props.tiendas);
  return (
    <GoogleMap
      defaultZoom={17}
      defaultCenter={{ lat: 4.7106502, lng: -74.0493288 }}
    >
      {props.isMarkerShown && <Marker position={props.mar} />}
      {props.tiendas.map((tienda) => (
        <Marker
          key={tienda._id}
          position={tienda.position}
          onMouseOver={() => {
            setSelected(tienda);
          }}
        />
      ))}
      {selected && (
        <InfoWindow
          position={selected.position}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div id="divGloboMapa">
            <p>{selected.name}</p>
            <img
              id="imgGlobo"
              src={selected.image}
              width="80"
              alt="Imagen´{selected.name}´"
            ></img>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
});
export default Maps;
