import React, { useState, useEffect } from "react";
import { baseUrl } from "../utils/baseUrl";
import { Container, Col, Row } from "reactstrap";
import MapContainer from "./MapContainer";

const MapPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [readyRestaurants, setReadyRestaurants] = useState([]);
  const [radius, setRadius] = useState(0);
  const [deviation, setDeviation] = useState(0);
  const [average, setAverage] = useState(0);
  const [location, setLocation] = useState({});

  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch(baseUrl);
      const data = await response.json();
      setRestaurants(data);
    };
    fetchdata();
  }, []);

  const calculateDistance = (pointA, pointB) => {
    const lat1 = pointA.latitude;
    const lon1 = pointA.longitude;

    const lat2 = pointB.latitude;
    const lon2 = pointB.longitude;

    const R = 6371e3; // earth radius in meters
    const φ1 = lat1 * (Math.PI / 180);
    const φ2 = lat2 * (Math.PI / 180);
    const Δφ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * (Math.sin(Δλ / 2) * Math.sin(Δλ / 2));

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
  };

  const filterRestaurantsByRadius = () => {
    const filteredResturants = restaurants.filter(restaurant => {
      const restaurantCoordinates = {
        latitude: restaurant.address.location.lat,
        longitude: restaurant.address.location.lng
      };
      const locationCoordinates = {
        latitude: location.lat,
        longitude: location.lng
      };
      const distance = calculateDistance(
        restaurantCoordinates,
        locationCoordinates
      );
      return distance <= +radius;
    });
    setReadyRestaurants(filteredResturants);
  };

  useEffect(() => {
    updateLocations();
  }, [readyRestaurants]);

  const handleChange = e => {
    setRadius(e.target.value);
  };

  const updateLocations = () => {
    const mean =
      readyRestaurants
        .map(restaurant => restaurant.rating)
        .reduce((sum, value) => sum + value, 0) / readyRestaurants.length;
    setAverage(mean);
    const variance =
      readyRestaurants
        .map(restaurant => Math.pow(restaurant.rating - mean, 2))
        .reduce((sum, val) => sum + val, 0) / readyRestaurants.length;
    const dev = Math.sqrt(variance);
    setDeviation(dev);
  };

  const onLocationChangedHandler = location => {
    setLocation(location);
    console.log(location);
  };

  return (
    <Container>
      Selecciona el punto de partida inicial dando click en el mapa
      <br></br>
      <br />
      Ingresa el radio de tu búsqueda a partir de tu posición inicial
      <input
        type="number"
        className="form-control"
        onChange={handleChange}
        value={radius}
      />
      <br />
      <button
        className="form-control"
        onClick={() => {
          filterRestaurantsByRadius();
        }}
      >
        {" "}
        Encontrar
      </button>
      <br />
      <br />
      {readyRestaurants.length > 0 ? (
        <div>
          <div>
            Número total de restaurantes en el radio dado{" "}
            {readyRestaurants.length}
          </div>
          <div>
            Promedio de rating de restaurantes en el rango seleccionado{" "}
            {average}
          </div>

          <div>
            Desviación Estándar{" "}
            {deviation}
          </div>
        </div>
      ) : (
        "Aún no has hecho ninguna búsqueda"
      )}
      <br />
      <Row>

          <MapContainer
            data={readyRestaurants}
            locationChanged={onLocationChangedHandler}
          />
      </Row>
    </Container>
  );
};
export default MapPage;
