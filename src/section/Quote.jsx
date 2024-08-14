import React, { useState, useEffect } from "react";
import { FaQuoteLeft, FaTwitter, FaTumblr } from "react-icons/fa";
import { useSpring, animated } from "react-spring";

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
    const response = await fetch("https://type.fit/api/quotes");
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

  // Animation for quote text and background color
  const quoteAnimation = useSpring({
    opacity: 1,
    color: color,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const bgAnimation = useSpring({
    backgroundColor: color,
    config: { duration: 500 },
  });

  return (
    <animated.div
      className="min-h-screen flex items-center justify-center"
      style={bgAnimation}
    >
      <animated.div
        id="quote-box"
        className="bg-white p-10 rounded shadow-md text-center"
        style={quoteAnimation}
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
            style={{ color: color }}
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
            style={{ color: color }}
          >
            <FaTumblr className="text-2xl" />
          </a>
          <button
            className="button bg-gray-800 text-white px-4 py-2 rounded"
            id="new-quote"
            onClick={getQuote}
            style={{ backgroundColor: color }}
          >
            New quote
          </button>
        </div>
      </animated.div>
      <footer className="mt-8 text-white">
        by <a href="tushar-portfolio-lemon.vercel.app">Tushar</a>
      </footer>
    </animated.div>
  );
};

export default Quote;
