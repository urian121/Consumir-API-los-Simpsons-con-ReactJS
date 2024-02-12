import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/home.css";
import miImagen from "../assets/imgs/los_simpsons.gif";

const ApiSimpsons = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      let url_api = "https://thesimpsonsquoteapi.glitch.me/quotes?count=50";
      try {
        const response = await axios.get(url_api);
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log("Erro en la carga");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Cargando espere...</div>;
  }

  return (
    <>
      <div className="row justify-content-md-center">
        <h1>
          Consumir API Personajes de los Simpsons en ReactJS 🚀
          <br />
          <img src={miImagen} className="img-fluid" alt="Los Simpsons" />
          <hr />
        </h1>
      </div>
      <div className="row justify-content-md-center">
        {data.map((item, index) => (
          <div key={index} className="col-md-3 card-4">
            <div className="card-content mb-5">
              <img src={item.image} className="img_simpsons mb-3" />
            </div>
            <div className="card-footer mt-5">
              <p>{item.character}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ApiSimpsons;
