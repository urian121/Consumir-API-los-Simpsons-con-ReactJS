import React, { useState, useEffect } from "react";
import axios from "axios";

function ApiComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          "https://thesimpsonsquoteapi.glitch.me/quotes?count=50"
        );
        const englishQuotes = response.data.map((quote) => quote.quote);
        const translatedQuotes = await translateToSpanish(englishQuotes);
        setData(translatedQuotes);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const translateToSpanish = async (quotes) => {
    const translatedQuotes = [];

    for (const quote of quotes) {
      try {
        const translationResponse = await axios.post(
          "https://translation.googleapis.com/language/translate/v2",
          null,
          {
            params: {
              q: quote,
              target: "es",
              key: "TU_API_KEY_DE_GOOGLE_TRANSLATE", // Reemplaza con tu propia API key
            },
          }
        );

        translatedQuotes.push(
          translationResponse.data.data.translations[0].translatedText
        );
      } catch (error) {
        translatedQuotes.push("Error de traducción");
      }
    }

    return translatedQuotes;
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Citas de Los Simpson en español</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default ApiComponent;
