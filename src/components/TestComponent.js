import React, { useContext, useRef, useState } from "react";
import TestContext from "./TestContext";
function TestComponent(props) {
  const { time, setTime } = useContext(TestContext);
  const [status, setStatus] = useState(`Less then ${props.max}`);
  React.useEffect(() => {
    if (time === props.max) {
      setStatus(`Equal to ${props.max}`);
    } else if (time > props.max) {
      setStatus(`Greater then ${props.max}`);
      props.onEnd();
    } else {
      setStatus(`Less then ${props.max}`);
    }
    setTimeout(() => {
      if (time <= props.max) {
        setTime(time + props.step);
      } else {
        setTime(0);
      }
    }, props.step * 1000);
  }, [time]);
  return (
    <div
      style={{
        width: "500px",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Timer</h1>
      <h1>{time}</h1>
      <h1>Status</h1>
      <h1>{status}</h1>
    </div>
  );
}

export default TestComponent;
