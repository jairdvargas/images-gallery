import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import {useState} from 'react';



const App = () => {
  const [palabra, definirPalabra] = useState('')
  
  const manejadorSearchSubmit = (e) => {
    e.preventDefault();
    console.log(palabra);
    //console.log(e.target[0].value);
    //console.log(e.target[0].value);
  };


  return (
    <div className="App">
      <Header titulo="Galeria de Imagenes_"/>
      <Search palabra={palabra} definirPalabra={definirPalabra} manejadorSubmit={manejadorSearchSubmit} />
    </div>
  );
}

export default App;
