import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";
import { useSelector } from "react-redux";
import "../StyleComponent/GoogleMaps.css";
function MyGoogleMap() {
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState(0);
  const user = useSelector((state) => state.user.loginSuccess);
  useEffect(() => {
    setLoading(true)
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${user.address}.json?access_token=pk.eyJ1IjoibGV0YXRjaGluaCIsImEiOiJjbDhjd2x1NTkwMzV0M3BvYmpweWJwZG9hIn0.crltMkQeuF92KSs1DRH2pQ`
      )
      .then((res) => {
        setLoading(false)
        axios
          .get(
            `https://api.mapbox.com/directions/v5/mapbox/driving/108.24861,16.03083;${res.data.features[0].center[0]},${res.data.features[0].center[1]}?geometries=geojson&access_token=pk.eyJ1IjoibGV0YXRjaGluaCIsImEiOiJjbDhjd2x1NTkwMzV0M3BvYmpweWJwZG9hIn0.crltMkQeuF92KSs1DRH2pQ`
          )
          .then((res) => setDistance((res.data.routes[0].distance / 1000).toFixed(1)));
      });
  }, [user]);
  return (
    <>
      <Map
        initialViewState={{
          longitude: 108.23861,
          latitude: 16.03083,
          zoom: 14,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken="pk.eyJ1IjoibGV0YXRjaGluaCIsImEiOiJjbDhjd2x1NTkwMzV0M3BvYmpweWJwZG9hIn0.crltMkQeuF92KSs1DRH2pQ"
      >
        <Marker latitude={16.075887} anchor="center" longitude={108.210483}>
          <img
            alt="asd"
            style={{ width: "20px", height: "20px" }}
            src="https://w7.pngwing.com/pngs/731/25/png-transparent-location-icon-computer-icons-google-map-maker-marker-pen-cartodb-map-marker-heart-logo-color-thumbnail.png"
          />
        </Marker>
      </Map>
    </>
  );
}
export default MyGoogleMap;
