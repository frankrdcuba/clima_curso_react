import React, { useState, useEffect } from "react";
import Clima from "./components/Clima";
import Formulario from "./components/Formulario";
import Header from "./components/Header";
import Error from "./components/Error";

function App() {
  const [search, setSearch] = useState({
    ciudad: "",
    pais: "",
  });
  const [resultado, setResultado] = useState({});
  const [consultar, setConsultar] = useState(false);
  const [error, setError] = useState(false);
  const { ciudad, pais } = search;
  useEffect(() => {
    const api = async () => {
      if (consultar) {
        const appId = "faf55940cb9d46fa7d74a80436226082";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        const respuesta = await fetch(url);
        const resul = await respuesta.json();
        setResultado(resul);
        setConsultar(false);

        //Revisa si hubo un resultado
        if (resultado.cod === "404") {
          setError(true);
        } else {
          setError(false);
        }
      }
    };
    api();
  }, [consultar]);

  let componente;
  if (error) {
    componente = <Error mensaje="No hay resultados" />;
  } else {
    componente = <Clima resultado={resultado} />;
  }

  return (
    <>
      <Header titulo="Cliente React App" />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                search={search}
                setSearch={setSearch}
                setConsultar={setConsultar}
              />
            </div>
            <div className="col m6 s12">{componente}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
