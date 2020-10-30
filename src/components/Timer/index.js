import React, { useContext } from "react";
import "./Timer.css";
import GlobalContext from "../contexts/GlobalContext"
const red = "#962108";
const green = "#0F7E0A";
function Timer(props) {
  const {start,setStart} = useContext(GlobalContext)
  const [max, setMax] = React.useState(500);
  const [duration, setDuration] = React.useState(props.duration);
  const [counter, setCounter] = React.useState(duration);
  const [value, setValue] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);
  //
  const [color, setColor] = React.useState(red);
  const [title, setTitle] = React.useState("Stop");
  //
  let count;
  //
  const play = () => {
    setStart(true);
  };
  const pause = () => {
    setStart(false);
  };
  const reset = () => {
    setCounter(duration);
    setStart(false);
  };
  const set_duration = (value = 1) => {
    setCounter(parseInt(value));
    setDuration(parseInt(value));
    setStart(false);
  };
  //
  const decrementCounter = () => {
    count = counter;
    count--;
    start && setCounter(count);
  };
  React.useEffect(() => {
    if (counter < 0) {
      setCounter(duration);
      props.onEnd();
    }
    start && counter >= 0 && setTimeout(decrementCounter, 1000);
  }, [counter, start]);
  return (
    <div className="timer-container">
      {/*  */}
      <div
        style={{
          width: "150px",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>{counter}</h1>
      </div>
      {/*  */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
        }}
      >
        <input
          className="time-input-field"
          type="number"
          id="quantity"
          name="quantity"
          placeholder="secs.."
          min="1"
          max={max}
          step="1"
          value={value}
          disabled={disabled}
          onKeyDown={(evt) =>
            ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault()
          }
          onChange={(e) => {
            let code = e.target.value.charCodeAt(0);
            if (e.target.value === "") {
              setValue("");
              return;
            }
            if (code >= 49 && code <= 57) {
              if (e.target.value <= max && e.target.value >= 1) {
                setValue(e.target.value);
              } else {
                console.log(e.target.value);
                e.preventDefault();
              }
            }
          }}
        />
        <button
          className="timer-btn"
          disabled={disabled}
          style={{ cursor: `${disabled ? `unset` : `pointer`}` }}
          onClick={() => {
            if (value !== "") {
              set_duration(value);
            } else alert("Choose valid duration!!");
          }}
        >
          Set Duration
        </button>
        <button
          className="timer-btn"
          style={{ backgroundColor: `${color}` }}
          onClick={() => {
            if (disabled) {
              setDisabled(false);
              pause();
              setColor(green);
              setTitle("Start");
            } else {
              if (value === "") {
                alert("Choose valid duration!!");
                return;
              } else {
                play();
                // Provide time to root component
                props.getDuration(value);
                //
                setDisabled(true);
                setColor(red);
                setTitle("Stop");
                setValue("");
              }
            }
          }}
        >
          {title}
        </button>
      </div>
    </div>
  );
}
Timer.defaultProps = {
  onEnd: () => console.log("End"),
  getDuration: (value = 0) => console.log(value),
  duration: 5,
};
export default Timer;
