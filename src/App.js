import { useState, useEffect } from 'react';
import './App.css';

import Clock from './components/Clock';

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  useEffect(() => {
    let intervalId = null;

    intervalId = setInterval(() => {
      setTimeLeft(time => time - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <div className="App">
      <div class="control-length-container">
        <div>
          <h4>Break Length</h4>
          <div class="button-container">
            <button>-</button>
            <span>5</span>
            <button>+</button>
          </div>
        </div>

        <div>
          <h4>Session Length</h4>
          <div class="button-container">
            <button>-</button>
            <span>25</span>
            <button>+</button>
          </div>
        </div>
      </div>

      <Clock duration={timeLeft} />
    </div>
  );
}

export default App;
