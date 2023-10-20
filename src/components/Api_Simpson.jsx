import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/home.css";

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
      <h1>
        Personajes de los Simpsons <hr />
      </h1>
      <div className="row justify-content-md-center">
        {data.map((item, index) => (
          <div key={index} className="col-md-4 img_simpsons">
            Frase:{item.quote}
            <img src={item.image} className="rounded mx-auto d-block" />
            <p>{item.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApiComponent;
