import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import { useState } from 'react';
import ImageCard from './components/ImageCard';
import { Container, Row, Col } from 'react-bootstrap';

const UNSPLASH_KEY = process.env.REACT_APP_UNPSASH_KEY;

const App = () => {
  const [palabra, definirPalabra] = useState('');
  const [imagenes, definirImagenes] = useState([]);

  //console.log(imagenes);

  const manejadorSearchSubmit = (e) => {
    e.preventDefault();
    console.log(palabra);
    //console.log(e.target[0].value);
    //console.log(e.target[0].value);
    fetch(
      `https://api.unsplash.com/photos/random/?query=${palabra}&client_id=${UNSPLASH_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        //agregando al principio del mismo array el valor de data al array de imgenes
        definirImagenes([{ ...data, titulo: palabra }, ...imagenes]);
      })
      .catch((err) => {
        console.log(err);
      });
    // Sirve para limpiar la casilla de busqueda una vez que se termina de buscar
    definirPalabra('');
  };
  const manejadorEliminaImagen = (id) => {
    definirImagenes(imagenes.filter((imagen) => imagen.id !== id));
  };

  //Solamente va a ser insertado las Cards cuando el array de imagenes no
  //sea cero, los doble signo de admiracion se usa para volverlo en boolean
  return (
    <div className="App">
      <Header titulo="Galeria de Imagenes_" />
      <Search
        palabra={palabra}
        definirPalabra={definirPalabra}
        manejadorSubmit={manejadorSearchSubmit}
      />
      <Container className="mt-4">
        <Row sd={1} md={2} lg={3}>
          {imagenes.map((imagen, i) => (
            <Col key={i} className="pb-3">
              <ImageCard
                key={i}
                imagen={imagen}
                eliminarImagen={manejadorEliminaImagen}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
//{!!imagenes.length && <ImageCard imagen={imagenes[0]} />}
//{imagenes.length > 1 && <ImageCard imagen={imagenes[1]} />}

export default App;
