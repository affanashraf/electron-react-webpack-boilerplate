import "./App.css";
import React, { useContext } from "react";
import RangeContext from "./contexts/RangeContext";
import GlobalContext from "./contexts/GlobalContext";
import Range from "./Range";
import TestSection from "./TestSection";
import useRange from "./hooks/useRange";
import InputExcelCSV from "./Utils/InputExcelCSV";
//
export default function App() {
  const {
    totalWords,
    ranges,
    poolIndexes,
    addRange,
    setPoolIndexes,
    setRanges,
    selectRange,
    unSelectRange,
    findSelectedRanges,
    setTotalWords,
  } = useRange();
  //
  const [words, setWords] = React.useState([]);
  const [defs, setDefs] = React.useState([]);
  const [time, setTime] = React.useState(5);
  const [start, setStart] = React.useState(false);
  const [clicked, setClicked] = React.useState(false);
  const [imported, setImported] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  //
  const [value, setValue] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const TimerInput = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "200px",
        height: "60px",
        alignSelf: "center",
      }}
    >
      <input
        type="number"
        id="quantity"
        name="quantity"
        placeholder="secs.."
        min="1"
        max="1000"
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
            if (e.target.value <= 1000 && e.target.value >= 1) {
              setValue(e.target.value);
            } else {
              console.log(e.target.value);
              e.preventDefault();
            }
          }
        }}
      />
      <button
        style={{
          padding: "5px",
          backgroundColor: "white",
          color: "black",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => {
          if (value !== "") {
            setTime(value);
            setClicked(false);
          }
        }}
      >
        Set
      </button>
    </div>
  );
  return (
    <GlobalContext.Provider
      value={{
        words,
        defs,
        time,
        start,
        isSaved,
        imported,
        setIsSaved,
        setImported,
        setStart,
        setTime,
        setWords,
        setDefs,
      }}
    >
      <RangeContext.Provider
        value={{
          totalWords,
          ranges,
          poolIndexes,
          addRange,
          setPoolIndexes,
          setRanges,
          selectRange,
          unSelectRange,
          findSelectedRanges,
          setTotalWords,
        }}
      >
        <div className="container">
          <div className="app_bar">The Rick Butler English Institute</div>
          <div className="app_content">
            <div className="side_section">
              <Range />
              <InputExcelCSV />
              {clicked ? (
                TimerInput
              ) : (
                <button
                  className="set_timer_btn"
                  onClick={() => {
                    setClicked(true);
                  }}
                >
                  Set Timer
                </button>
              )}
            </div>
            <TestSection />
          </div>
        </div>
      </RangeContext.Provider>
    </GlobalContext.Provider>
  );
}
