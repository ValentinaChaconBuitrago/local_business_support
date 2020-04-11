import {
  withGoogleMap,
  GoogleMap,
  GoogleMaps,
  Marker,
  InfoWindow,
} from "react-google-maps";
import React, { useState, useEffect } from "react";
let latActual = 0;
let lonActual = 0;

const Maps = withGoogleMap((props) => {
  const [selected, setSelected] = useState(null);

  return (
    <GoogleMap defaultZoom={14} defaultCenter={props.mar}>
      {props.isMarkerShown && <Marker position={props.mar} />}
      {props.tiendas.map((tienda) => (
        <Marker
          icon={{
            url:
              " https://maps.gstatic.com/mapfiles/ms2/micons/grocerystore.png",
          }}
          key={tienda._id}
          position={tienda.position}
          onMouseOver={() => {
            setSelected(tienda);
          }}
          onMouseOut={() => {
            setSelected(null);
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
              height="80"
              alt="Imagen´{selected.name}´"
            ></img>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
});
export default Maps;
