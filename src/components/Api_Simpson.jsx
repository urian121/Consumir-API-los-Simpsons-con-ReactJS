import React, { useState, useEffect } from "react";
import axios from "axios";

function ApiComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      let url_api = "https://thesimpsonsquoteapi.glitch.me/quotes?count=50";
      try {
        const response = await axios.get(url_api);
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Personajes de los Simpson</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            Frase:{item.quote}
            <img src={item.image} />
            <p>Nombre: {item.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApiComponent;
