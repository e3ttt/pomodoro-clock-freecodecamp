import { useState, useEffect, useRef } from 'react';
import './App.css';

import Clock from './components/Clock';
import beep from './audio/beep.mp3';

import Colors from './constants/Colors';

import MdPlay from 'react-ionicons/lib/MdPlay';
import MdPause from 'react-ionicons/lib/MdPause';
import MdSquare from 'react-ionicons/lib/MdSquare';
import MdAddCircle from 'react-ionicons/lib/MdAddCircle';
import MdRemoveCircle from 'react-ionicons/lib/MdRemoveCircle';

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [active, setActive] = useState(false);
  const [sessionTurn, setSessionTurn] = useState(true);

  const audio = useRef(null);

  useEffect(() => {
    let intervalId = null;
    let timeOutId = null;

    if (timeLeft === 0) {
      timeOutId = setTimeout(() => {
        setSessionTurn(state => !state);
      }, 1000);
      audio.current.play();
    }

    if (active) {
      intervalId = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeOutId);
    };
  }, [timeLeft, active]);

  useEffect(() => {
    if (sessionTurn) {
      setTimeLeft(sessionLength * 60);
    } else {
      setTimeLeft(breakLength * 60);
    }
  }, [sessionTurn, sessionLength, breakLength]);

  const increment = time => {
    return time + 1 > 60 ? 60 : time + 1;
  };

  const decrement = time => {
    return time - 1 > 0 ? time - 1 : 1;
  };

  const decrementTimeLeft = time => {
    return time - 60 > 0 ? time - 60 : 60;
  };

  const incrementTimeLeft = time => {
    return time + 60 > 60 * 60 ? 60 * 60 : time + 60;
  };

  return (
    <div className="App">
      <div className="control-length-container">
        <div>
          <h4 id="break-label">Break Length</h4>
          <div className="button-container">
            <button
              onClick={() => setBreakLength(time => decrement(time))}
              disabled={active}
              id="break-decrement"
            >
              <MdRemoveCircle fontSize="40px" color={Colors.pale} />
            </button>
            <span id="break-length">{breakLength}</span>
            <button
              onClick={() => setBreakLength(time => increment(time))}
              disabled={active}
              id="break-increment"
            >
              <MdAddCircle fontSize="40px" color={Colors.pale} />
            </button>
          </div>
        </div>

        <div>
          <h4 id="session-label">Session Length</h4>
          <div className="button-container">
            <button
              onClick={() => {
                setSessionLength(time => decrement(time));
                setTimeLeft(time => decrementTimeLeft(time));
              }}
              disabled={active}
              id="session-decrement"
            >
              <MdRemoveCircle fontSize="40px" color={Colors.pale} />
            </button>
            <span id="session-length">{sessionLength}</span>
            <button
              onClick={() => {
                setSessionLength(time => increment(time));
                setTimeLeft(time => incrementTimeLeft(time));
              }}
              disabled={active}
              id="session-increment"
            >
              <MdAddCircle fontSize="40px" color={Colors.pale} />
            </button>
          </div>
        </div>
      </div>

      <Clock duration={timeLeft} sessionTurn={sessionTurn} />

      <div className="control-clock-container">
        <button onClick={() => setActive(state => !state)} id="start_stop">
          {active ? (
            <MdPause fontSize="60px" color={Colors.pale} />
          ) : (
            <MdPlay fontSize="60px" color={Colors.pale} />
          )}
        </button>
        <button
          onClick={() => {
            setActive(false);
            setTimeLeft(25 * 60);
            setSessionLength(25);
            setBreakLength(5);
            setSessionTurn(true);
            audio.current.pause();
            audio.current.currentTime = 0;
          }}
          id="reset"
        >
          <MdSquare fontSize="60px" color={Colors.pale} />
        </button>
      </div>
      <audio id="beep" src={beep} ref={audio}></audio>
    </div>
  );
}

export default App;
