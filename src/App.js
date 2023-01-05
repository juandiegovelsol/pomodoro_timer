import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./App.css";
import gear from "./images/gear.svg";
import check from "./images/check.svg";
import plus from "./images/plus.svg";
import minus from "./images/minus.svg";
import clockSound from "./static/old-alarm-clock.mp3";

const renderTime = ({ remainingTime }) => {
  const minutes =
    Math.floor(remainingTime / 60) < 10
      ? "0" + Math.floor(remainingTime / 60)
      : Math.floor(remainingTime / 60);
  const seconds =
    remainingTime % 60 < 10 ? "0" + (remainingTime % 60) : remainingTime % 60;
  if (remainingTime === 0) {
    return <article>Time to rest!</article>;
  }
  return (
    <div className="timerClock">
      {minutes}:{seconds}
    </div>
  );
};

const play = () => {
  new Audio(clockSound).play();
};

function App() {
  const [timerKey, setTimerKey] = useState(0);
  const [durationTimer, setDurationTimer] = useState(900);
  const [timerObj, setTimerObj] = useState([
    {
      key: 0,
      timerKey: 0,
      isPlaying: false,
      strokeColor: "#9d0000",
      buttonClass: "timerButton",
      imgSrc: gear,
      buttonText: "S T A R T",
      modTimerClass: "timerConfigModHidden",
    },
  ]);

  const handleButtonClick = () => {
    let timeout = (durationTimer - 2) * 1000;
    let newTimerObj = [...timerObj];
    if (newTimerObj[0].isPlaying === false) {
      newTimerObj[0].isPlaying = true;
      newTimerObj[0].buttonText = "S T O P";
      setTimeout(() => {
        play();
      }, timeout);
    } else {
      setTimerKey((prevTimerKey) => prevTimerKey + 1);
      newTimerObj[0].isPlaying = false;
      newTimerObj[0].buttonText = "S T A R T";
    }
    setTimerObj(newTimerObj);
  };

  const handleImgClick = () => {
    let newTimerObj = [...timerObj];
    if (newTimerObj[0].imgSrc === gear) {
      newTimerObj[0].imgSrc = check;
      newTimerObj[0].buttonClass = "timerButtonHidden";
      newTimerObj[0].modTimerClass = "timerConfigMod";
      newTimerObj[0].strokeColor = "#00aa51";
      newTimerObj[0].isPlaying = false;
      newTimerObj[0].buttonText = "S T A R T";
      setTimerKey((prevTimerKey) => prevTimerKey + 1);
    } else {
      newTimerObj[0].buttonClass = "timerButton";
      newTimerObj[0].modTimerClass = "timerConfigModHidden";
      newTimerObj[0].strokeColor = "#9d0000";
      newTimerObj[0].imgSrc = gear;
    }
    setTimerObj(newTimerObj);
  };

  const handleMinusClick = () => {
    if (durationTimer > 60) {
      setDurationTimer((prevDurationTimer) => prevDurationTimer - 60);
    }
  };

  const handlePlusClick = () => {
    if (durationTimer < 1800) {
      setDurationTimer((prevDurationTimer) => prevDurationTimer + 60);
    }
  };

  return (
    <main className="App">
      {timerObj.map((timerObj) => {
        return (
          <section className="timerWrapper" key={timerObj.key}>
            <article className="timer">
              <CountdownCircleTimer
                key={timerKey}
                isPlaying={timerObj.isPlaying}
                duration={durationTimer}
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
                <img
                  src={minus}
                  className={timerObj.modTimerClass}
                  onClick={handleMinusClick}
                  alt="minus"
                ></img>
                <img
                  className="timerConfig"
                  src={timerObj.imgSrc}
                  onClick={handleImgClick}
                  alt="config"
                ></img>
                <img
                  src={plus}
                  className={timerObj.modTimerClass}
                  onClick={handlePlusClick}
                  alt="plus"
                ></img>
              </div>
            </article>
          </section>
        );
      })}
    </main>
  );
}

export default App;
