import React, { useState, useEffect } from "react";
import { FaQuoteLeft,FaQuoteRight, FaTwitter, FaTumblr } from "react-icons/fa";
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
    <div>
      <animated.div
        className="min-h-screen flex items-center justify-center font-mono"
        style={bgAnimation}
      >
        <animated.div
          id="quote-box"
          className="bg-white max-w-[40%] p-10 rounded shadow-xl text-center"
          style={quoteAnimation}
        >
          <div className="quote-text flex text-3xl font-bold mb-4">
            <FaQuoteLeft /> 
            <span id="text" className="pl-2">{quote}</span>
            <FaQuoteRight /> 
          </div>
          <div className="quote-author text-right text-lg font-light mb-4 tracking-tighter">
            - <span id="author">{author}</span>
          </div>
          <div className="buttons flex justify-between ">
            <a
              href={`https://twitter.com/intent/tweet?text=${quote} - ${author}`}
              className="button  p-2 rounded-md"
              id="tweet-quote"
              title="Tweet this quote!"
              target="_blank"
              rel="noopener noreferrer"
              style={{ bg: color }}
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${author}&content=${quote}`}
              className="button p-2"
              id="tumblr-quote"
              title="Post this quote on tumblr!"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: color }}
            >
              <FaTumblr className="text-2xl" />
            </a>
            <button
              className="button bg-gray-800 text-white px-4 py-2 rounded shadow-lg"
              id="new-quote"
              onClick={getQuote}
              style={{ backgroundColor: color }}
            >
              New quote
            </button>
          </div>
        </animated.div>
      </animated.div>

    </div>
  );
};

export default Quote;
