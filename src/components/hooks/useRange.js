import { useState } from "react";
import _ from "lodash";
function useRange() {
  const [totalWords, setTotalWords] = useState(0);
  const [ranges, setRanges] = useState([]);
  const [poolIndexes, setPoolIndexes] = useState([]);
  const [selectedRanges, setSelectedRanges] = useState([]);
  const addRange = (range) => {
    let arr = [...ranges];
    arr.push(range);
    setRanges(arr);
  };
  const selectRange = (id) => {
    let arr = ranges.map((range) => {
      if (range.id === id) range.selected = true;
      return range;
    });
    setRanges(arr);
    findSelectedRanges(arr);
  };
  const unSelectRange = (id) => {
    let arr = ranges.map((range) => {
      if (range.id === id) range.selected = false;
      return range;
    });
    setRanges(arr);
    findSelectedRanges(arr);
  };
  const findSelectedRanges = (ranges) => {
    let arr = ranges.filter((range) => range.selected);
    let tempArr = arr.map((range) => {
      let arr = generateArr(range.start, range.end);
      return arr;
    });
    setSelectedRanges(tempArr);
    let temp = _.union(...tempArr);
    temp = _.shuffle(temp);
    console.log(temp);
    setPoolIndexes(temp);
  };
  const generateArr = (x, y) => {
    x--;

    let arr = [];
    for (let i = x; i < y; i++) {
      arr.push(i);
    }

    return arr;
  };
  return {
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
  };
}

export default useRange;
