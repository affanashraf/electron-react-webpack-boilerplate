import React, { useContext } from "react";
import Input from "../Utils/ControlledInput";
import RangeContext from "../contexts/RangeContext";
import GlobalContext from "../contexts/GlobalContext"
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
function RangeInput() {
  const { ranges, totalWords, addRange, findSelectedRanges } = useContext(
    RangeContext
  );
  const {setIsSaved} = useContext(GlobalContext)
  const [min, setMin] = React.useState("");
  const [max, setMax] = React.useState("");
  const isExist = (start, end) => {
    let index = _.findIndex(ranges, { start: start, end: end });
    if (index === -1) return false;
    else return true;
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <Input
          placeholder="From"
          min={1}
          max={totalWords === 0 || totalWords < 4 ? 2 : totalWords - 4}
          onChange={(value) => {
            setMin(parseInt(value));
          }}
        />
        <Input
          placeholder="To"
          min={1}
          max={totalWords === 0 || totalWords < 4 ? 2 : totalWords}
          onChange={(value) => {
            setMax(parseInt(value));
          }}
        />
      </div>
      <button
        className="range_btn"
        onClick={() => {
          if (min === "" || max === "") {
            alert("Range contains atleast 4 definitions!!");
            return;
          }
          let n = max - min;
          console.log(n);
          if (n < 4) {
            alert("Range contains atleast 4 definitions!!");
            return;
          }
          let id = uuidv4();
          let range = {
            start: min,
            end: max,
            id: id,
            selected: false,
          };
          console.log(isExist(min, max));
          if (!isExist(min, max)) {
            addRange(range);
            setIsSaved(false)
          }
        }}
      >
        Range Break
      </button>
    </div>
  );
}

export default RangeInput;
