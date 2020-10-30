import React, { useContext } from "react";
import "./Range.css";
import ListItem from "./ListItem";
import RangeContext from "../contexts/RangeContext";
import RangeInput from "./RangeInput";
import { v4 as uuidv4 } from "uuid";
function Range() {
  const { totalWords,ranges } = useContext(RangeContext);

  return (
    <div className="range_container">
      {/* <h1
        style={{ fontWeight: "lighter", fontSize: "15px", alignSelf: "center" }}
      >
        Workprofile.csv
      </h1> */}
      <h1
        style={{ fontWeight: "lighter", fontSize: "15px", alignSelf: "center" }}
      >
        Total Words: {totalWords}
      </h1>
      <RangeInput />
      <div className="range_list">
        {ranges.map((range) => (
          <ListItem
            id={range.id}
            start={range.start}
            end={range.end}
            selected={range.selected}
            key={range.id}
          />
        ))}
      </div>
      {/* <div className="range_err">
        <p>Error: CSV file not found!!</p>
      </div> */}
    </div>
  );
}

export default Range;
