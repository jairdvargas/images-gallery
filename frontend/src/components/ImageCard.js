import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ImageCard = ({ imagen, eliminarImagen, guardarImagen }) => {
  //vamos a retornar descripcion o sino alt descripcion porque a veces viene en null
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imagen.urls.small} />
      <Card.Body>
        <Card.Title>{imagen.titulo?.toUpperCase()}</Card.Title>
        <Card.Text>{imagen.alt_description || imagen.description}</Card.Text>
        <Button variant="primary" onClick={() => eliminarImagen(imagen.id)}>
          Eliminar
        </Button>{' '}
        {!imagen.guardado && (
          <Button variant="secondary" onClick={() => guardarImagen(imagen.id)}>
            Guardar
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ImageCard;
