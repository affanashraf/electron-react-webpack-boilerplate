import React, { useContext } from "react";
import GlobalContext from "../../contexts/GlobalContext";
import RangeContext from "../../contexts/RangeContext";
import TestSectionContext from "../../contexts/TestSectionContext";
import _ from "lodash";
function Definition() {
  //Context
  const {
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
  } = useContext(GlobalContext);
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
  } = useContext(RangeContext);
  const {
    right,
    wrong,
    opt_1,
    opt_2,
    opt_3,
    opt_4,
    word,
    def,
    pool,
    counter,
    timeCount,
    option,
    disabledOpt,
    disableDrill,
    setRight,
    setWrong,
    setOpt_1,
    setOpt_2,
    setOpt_3,
    setOpt_4,
    setWord,
    setDef,
    setPool,
    setCounter,
    setTimeCount,
    setOption,
    setDisabledOpt,
    setDisableDrill,
    init,
    drill,
    setDefinition,
    setScore,
    setDefault,
    handleOption,
    shuffle,
  } = useContext(TestSectionContext);
  return (
    <div className="app_definition">
      <p style={{ textAlign: "center" }}>{start ? def : "Definition"}</p>
    </div>
  );
}
export default Definition;
