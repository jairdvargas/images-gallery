import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import { useState } from 'react';

const UNSPLASH_KEY = process.env.REACT_APP_UNPSASH_KEY;

const App = () => {
  const [palabra, definirPalabra] = useState('');

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
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    // Sirve para limpiar la casilla de busqueda una vez que se termina de buscar
    definirPalabra('');
  };

  return (
    <div className="App">
      <Header titulo="Galeria de Imagenes_" />
      <Search
        palabra={palabra}
        definirPalabra={definirPalabra}
        manejadorSubmit={manejadorSearchSubmit}
      />
    </div>
  );
};

export default App;
