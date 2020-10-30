import React, { useContext } from "react";
import GlobalContext from "../../contexts/GlobalContext";
import RangeContext from "../../contexts/RangeContext";
import TestSectionContext from "../../contexts/TestSectionContext";
import _ from "lodash";
function Header() {
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
        width: "100%",
        height: "200px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="test_score">
        <h1>Score</h1>
        <div style={{ display: "flex" }}>
          <h2 className="score_lbl" style={{ backgroundColor: "green" }}>
            {start ? right : 0}
          </h2>
          <h2 className="score_lbl" style={{ backgroundColor: "red" }}>
            {start ? wrong : 0}
          </h2>
        </div>
      </div>
      <h1>Vocabulary Builder</h1>
      <div className="timer-container">
        <h1>{start ? timeCount : "Timer"}</h1>
      </div>
    </div>
  );
}
export default Header;
