import { useState, useEffect } from "react";
import React from "react";
import {
  Card,
  CardHeader,
  CardImg,
  CardTitle,
  CardText,
  CardSubtitle,
  CardBody,
  Container,
  CardFooter,
  Col,
  Row
} from "reactstrap";
import ShareComponent from "./Share";
import LikeFB from "./LikeFB";
import { baseUrl } from "../utils/baseUrl";

const Home = () => {
  const [restaurants, setRestaurant] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch(baseUrl);
      const data = await response.json();
      setRestaurant(data);
    };
    fetchdata();
  }, []);

  const handleChange = e => {
    if (e.target.value === "rating") {
      setRestaurant(prevRest => {
        const sorted = prevRest.sort((a, b) => (a.rating < b.rating ? 1 : -1));
        return [...sorted];
      });
    } else {
      setRestaurant(prevRest => {
        const sorted = prevRest.sort((a, b) => (a.name > b.name ? 1 : -1));
        return [...sorted];
      });
    }
  };

  return (
    <Container>
      <br></br>

      <select className="form-control" onChange={handleChange}>
        <option value="">Ordenar por :</option>
        <option value="rating">Ordenar por rating</option>
        <option value="nombre">Ordenar por Nombre</option>
      </select>
      <br></br>

      <Row>
        {restaurants.map(item => (
          <Col key={item.id} md={4}>
            <Card>
              <CardHeader> {item.name}</CardHeader>

              <CardImg
                top
                width="100%"
                src="https://picsum.photos/740/420/?random"
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle>
                  <h3>Rating {item.rating}</h3>
                </CardTitle>
                <CardSubtitle>
                  <h5>Direccion</h5>
                </CardSubtitle>
                <CardText>
                  {item.address.street} {item.address.city} {item.address.state}
                </CardText>
                <CardSubtitle>
                  <h5>Contacto</h5>
                </CardSubtitle>
                <CardText>{item.contact.site} </CardText>
                <CardText>{item.contact.email} </CardText>
                <CardText>{item.contact.phone} </CardText>
                <a
                  className="btn btn-primary"
                  href={item.contact.site}
                  role="button"
                >
                  Sitio Web
                </a>
              </CardBody>
              <CardFooter className="text-muted">
                <LikeFB url={item.contact.site} />

                <ShareComponent
                  url={item.contact.site}
                  text={item.name}
                  address={`${item.address.street} ${item.address.city} ${item.address.state}`}
                />
              </CardFooter>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
