import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import { useState } from 'react';
import ImageCard from './components/ImageCard';
import { Container, Row, Col } from 'react-bootstrap';
import Bienvenida from './components/Bienvenida';

//const UNSPLASH_KEY = process.env.REACT_APP_UNPSASH_KEY;
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

const App = () => {
  const [palabra, definirPalabra] = useState('');
  const [imagenes, definirImagenes] = useState([]);

  //console.log(imagenes);

  const manejadorSearchSubmit = (e) => {
    e.preventDefault();
    console.log(palabra);
    //console.log(e.target[0].value);
    //console.log(e.target[0].value);
    fetch(`${API_URL}/nueva-imagen?query=${palabra}`)
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
        {imagenes.length ? (
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
        ) : (
          <Bienvenida />
        )}
      </Container>
    </div>
  );
};
//{!!imagenes.length && <ImageCard imagen={imagenes[0]} />}
//{imagenes.length > 1 && <ImageCard imagen={imagenes[1]} />}

export default App;
