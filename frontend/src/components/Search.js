import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Search = ({palabra, definirPalabra, manejadorSubmit}) => {
  return (
    <Container className="mt-2">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form onSubmit={manejadorSubmit} >
            <Form.Group as={Row} className="mb-3"  controlId="formHorizontalEmail"  >
              <Col xs={9}>
                <Form.Control
                    text="text"
                    value={palabra}
                    onChange={(e) => definirPalabra(e.target.value)} 
                    placeholder="Buscar una nueva imagen" 
                />
              </Col>
              <Col >
                <Button variant="primary" type="submit"> Buscar</Button>
              </Col>
              
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
