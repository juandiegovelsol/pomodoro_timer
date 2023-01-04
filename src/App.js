import React, { useState } from "react";
import ReactDOM from "react-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./App.css";
import gear from "./images/gear.svg";
import check from "./images/check.svg";

const renderTime = ({ remainingTime }) => {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  if (remainingTime === 0) {
    return <article>Time to rest!</article>;
  }
  return (
    <div className="timerClock">
      {minutes}:{seconds}
    </div>
  );
};

function App() {
  const [timerObj, setTimerObj] = useState([
    {
      key: 1,
      isPlaying: false,
      duration: 100,
      strokeColor: "#9d0000",
      buttonClass: "timerButton",
      imgSrc: gear,
      buttonText: "Start",
      imgLink: "",
    },
  ]);
  const handleButtonClick = () => {
    let newTimerObj = [...timerObj];
    console.log(newTimerObj);
    if (newTimerObj[0].isPlaying === false) {
      newTimerObj[0].isPlaying = true;
      newTimerObj[0].buttonText = "Stop";
    } else {
      newTimerObj[0].isPlaying = false;
      newTimerObj[0].buttonText = "Start";
    }
    setTimerObj(newTimerObj);
  };

  return (
    <main className="App">
      {timerObj.map((timerObj) => {
        return (
          <section className="timerWrapper" key={timerObj.key}>
            <article className="timer">
              <CountdownCircleTimer
                isPlaying={timerObj.isPlaying}
                duration={timerObj.duration}
                size={500}
                strokeWidth={5}
                trailColor={"#000000"}
                colors={timerObj.strokeColor}
                onComplete={() => ({ shouldRepeat: true, delay: 1 })}
              >
                {renderTime}
              </CountdownCircleTimer>
            </article>
            <article className="timerContent">
              <button
                className={timerObj.buttonClass}
                onClick={handleButtonClick}
              >
                {timerObj.buttonText}
              </button>
              <div className="timerConfigWrapper">
                <p className="timerConfigMod">-</p>
                <img
                  className="timerConfig"
                  src={timerObj.imgSrc}
                  alt="config"
                ></img>
                <p className="timerConfigMod">+</p>
              </div>
            </article>
          </section>
        );
      })}
    </main>
  );
}

export default App;
