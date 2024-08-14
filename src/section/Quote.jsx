import React, { useState, useEffect } from "react";
import { FaQuoteLeft, FaTwitter, FaTumblr } from "react-icons/fa";

const Quote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [color, setColor] = useState("#333");

  const colors = [
    "#16a085",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6964",
    "#342224",
    "#472E32",
    "#BDBB99",
    "#77B1A9",
    "#73A857",
  ];

  const getQuotes = async () => {
    const response = await fetch(
      "https://type.fit/api/quotes"
    );
    const quotes = await response.json();
    return quotes;
  };

  const getQuote = async () => {
    const quotes = await getQuotes();
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    setQuote(randomQuote.text);
    setAuthor(randomQuote.author || "Unknown");
    const randomColor = Math.floor(Math.random() * colors.length);
    setColor(colors[randomColor]);
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: color }}
    >
      <div
        id="quote-box"
        className="bg-white p-10 rounded shadow-md text-center"
      >
        <div className="quote-text text-2xl font-bold mb-4">
          <FaQuoteLeft /> <span id="text">{quote}</span>
        </div>
        <div className="quote-author text-right text-xl font-semibold mb-4">
          - <span id="author">{author}</span>
        </div>
        <div className="buttons flex justify-between">
          <a
            href={`https://twitter.com/intent/tweet?text=${quote} - ${author}`}
            className="button"
            id="tweet-quote"
            title="Tweet this quote!"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-2xl" />
          </a>
          <a
            href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${author}&content=${quote}`}
            className="button"
            id="tumblr-quote"
            title="Post this quote on tumblr!"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTumblr className="text-2xl" />
          </a>
          <button
            className="button bg-gray-800 text-white px-4 py-2 rounded"
            id="new-quote"
            onClick={getQuote}
          >
            New quote
          </button>
        </div>
      </div>
      <div className="mt-8 text-white">
        by <a href="https://tushar-portfolio-lemon.vercel.app/"><u>Tushar</u></a>
      </div>
    </div>
  );
};

export default Quote;
