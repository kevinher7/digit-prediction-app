import { useState } from "react";

import SquareBubble from "../../assets/square-speech-bubble.svg?react";

import "./index.css";
import { useLocation } from "react-router-dom";

const PredictionPage = () => {
  const [showDetails, setShowDetails] = useState(false);
  const { state } = useLocation();
  console.log(state);

  return (
    <div className="prediction">
      <header className="prediction-header">
        <span
          className="prediction-percent"
          onClick={() => setShowDetails(!showDetails)}
        >
          <p>{"(98.6%)"}</p>
          <SquareBubble className="prediction-bubble" />
        </span>
        <h1>
          Your number was a{" "}
          <span className="predictin-digit">{state.prediction}</span>!
        </h1>
      </header>
      {showDetails ? (
        <main className="prediction-main">
          <div className="prediction-main--view">
            <p>This is what the model saw!</p>
            <p>Image</p>
          </div>
          <div className="prediction-main--details">
            <p>
              The model is <span>98.6%</span> sure your number is a{" "}
              <span>7</span>
            </p>
            <p>The probabilities for it being another digit are</p>
            <div className="prediction-probabilities">
              <p>0</p>
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
              <p>6</p>
              <p>7</p>
              <p>8</p>
              <p>9</p>
            </div>
            <div className="prediction-probability--value">2.0%</div>
          </div>
        </main>
      ) : (
        <main></main>
      )}
      <button
        className="prediction-detail--toggle"
        onClick={() => setShowDetails(!showDetails)}
      >
        Show {showDetails ? "less" : "more"} details
      </button>
      <footer className="prediction-footer">
        <h2>Was I correct?</h2>
        <div className="feedback-buttons">
          <button className="yes-button">Yes!</button>
          <button className="no-button">{"No:("}</button>
        </div>
      </footer>
    </div>
  );
};

export default PredictionPage;
