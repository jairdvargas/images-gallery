import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import { useState, useEffect } from 'react';
import ImageCard from './components/ImageCard';
import { Container, Row, Col } from 'react-bootstrap';
import Bienvenida from './components/Bienvenida';
import axios from 'axios';

//const UNSPLASH_KEY = process.env.REACT_APP_UNPSASH_KEY;
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

const App = () => {
  const [palabra, definirPalabra] = useState('');
  const [imagenes, definirImagenes] = useState([]);

  //solo se ejecutara una sola vez
  const getImagenesGuardadas = async () => {
    try {
      const resultado = await axios.get(`${API_URL}/imagenes`);
      definirImagenes(resultado.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => getImagenesGuardadas(), []);

  //console.log(imagenes);

  const manejadorSearchSubmit = async (e) => {
    e.preventDefault();

    //Aqui estamos usando la libreria axios para poder esperar que recibimos una respuesta
    try {
      const resultado = await axios.get(
        `${API_URL}/nueva-imagen?query=${palabra}`
      );
      //Aqui se agrega la imagen y se pone en el array
      definirImagenes([{ ...resultado.data, titulo: palabra }, ...imagenes]);
    } catch (error) {
      console.log(error);
    }

    // Sirve para limpiar la casilla de busqueda una vez que se termina de buscar
    definirPalabra('');
  };

  //sirve para eliminar imagne
  const manejadorEliminaImagen = (id) => {
    definirImagenes(imagenes.filter((imagen) => imagen.id !== id));
  };

  //sirve para guardar imagen
  const manejadorGuardarImagen = async (id) => {
    const imagenAGuardarse = imagenes.find((imagen) => imagen.id === id);
    //se agrega una propiedad de si esta  guardado o no
    imagenAGuardarse.guardado = true;
    try {
      const resultado = await axios.post(
        `${API_URL}/imagenes`,
        imagenAGuardarse
      );
      if (resultado.data?.id_insertado) {
        definirImagenes(
          imagenes.map((imagen) =>
            imagen.id === id ? { ...imagen, guardado: true } : imagen
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
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
                  guardarImagen={manejadorGuardarImagen}
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
