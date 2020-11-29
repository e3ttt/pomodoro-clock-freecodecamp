const Clock = props => {
  const getMinutes = totalSeconds => {
    return Math.floor(totalSeconds / 60);
  };

  const getSeconds = totalSeconds => {
    return totalSeconds % 60;
  };

  return (
    <div id="time-left">
      <span>{getMinutes(props.duration).toString().padStart(2, '0')}</span>
      <span>:</span>
      <span>{getSeconds(props.duration).toString().padStart(2, '0')}</span>
    </div>
  );
};

export default Clock;
