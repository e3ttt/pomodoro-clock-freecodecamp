const Clock = props => {
  const getMinutes = totalSeconds => {
    return Math.floor(totalSeconds / 60);
  };

  const getSeconds = totalSeconds => {
    return totalSeconds % 60;
  };

  return (
    <div
      id="time-left-container"
      style={{ color: props.sessionTurn ? '' : '#0f0' }}
    >
      <div id="timer-label">{props.sessionTurn ? 'Session' : 'Break'}</div>
      <div id="time-left">
        {getMinutes(props.duration).toString().padStart(2, '0')}:
        {getSeconds(props.duration).toString().padStart(2, '0')}
      </div>
    </div>
  );
};

export default Clock;
