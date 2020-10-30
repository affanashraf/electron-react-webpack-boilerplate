import React, { useContext } from "react";
import GlobalContext from "../../contexts/GlobalContext";
import RangeContext from "../../contexts/RangeContext";
import TestSectionContext from "../../contexts/TestSectionContext";
import _ from "lodash";
function DefOptions() {
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
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "60%",
        alignSelf: "center",
        marginTop: "20px",
        justifyContent: "center",
      }}
    >
      <button
        className="app_def_option"
        disabled={disabledOpt}
        onClick={() => {
          handleOption(opt_1);
        }}
      >
        {start ? opt_1 : "A"}
      </button>
      <button
        className="app_def_option"
        disabled={disabledOpt}
        onClick={() => {
          handleOption(opt_2);
        }}
      >
        {start ? opt_2 : "B"}
      </button>
      <button
        className="app_def_option"
        disabled={disabledOpt}
        onClick={() => {
          handleOption(opt_3);
        }}
      >
        {start ? opt_3 : "C"}
      </button>
      <button
        className="app_def_option"
        disabled={disabledOpt}
        onClick={() => {
          handleOption(opt_4);
        }}
      >
        {start ? opt_4 : "D"}
      </button>
    </div>
  );
}
export default DefOptions;
