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
      <Clock duration={timeLeft} />
    </div>
  );
}

export default App;
