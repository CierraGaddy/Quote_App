import React, { useEffect, useState } from "react";

const QuoteDisplay = () => {
  const [quote, setQuote] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const fetchNewQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: {
          "X-Api-Key": import.meta.env.VITE_API_KEY, // Secure API key
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setQuote(data[0]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewQuote();
  }, []);

  const handleFetchClick = () => {
    fetchNewQuote();
  };

  return (
    <div>
      {error ? <p>Error: {error.message}</p> : <h2>{quote.quote}</h2>}
      <button onClick={handleFetchClick} disabled={isLoading}>
        {isLoading ? "Loading..." : "Fetch New Quote"}
      </button>
    </div>
  );
};

export default QuoteDisplay;
