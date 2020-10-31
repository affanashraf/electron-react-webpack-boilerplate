import React, { useContext } from "react";
import "./TestSection.css";
import RangeContext from "../contexts/RangeContext";
import GlobalContext from "../contexts/GlobalContext";
import TestSectionContext from "../contexts/TestSectionContext";
import useTestSection from "../hooks/useTestSection";
import _ from "lodash";
//
import Controls from "./Components/Controls";

function TestSection() {
  //
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
    startedBefore,
    stop,
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
  } = useTestSection();
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
  return (
    <div className="body_section">
      <TestSectionContext.Provider
        value={{
          stop,
          drill,
          startedBefore
        }}
      >
        {/* Header > Score, Title, Timer */}
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
                {(start || startedBefore) ? right : 0}
              </h2>
              <h2 className="score_lbl" style={{ backgroundColor: "red" }}>
                {(start || startedBefore) ? wrong : 0}
              </h2>
            </div>
          </div>
          <h1>Vocabulary Builder</h1>
          <div className="timer-container">
            <h1>{(start || startedBefore) ? timeCount : "Timer"}</h1>
          </div>
        </div>
        {/* Header */}

        {/* Definition */}
        <div className="app_definition">
          <p style={{ textAlign: "center" }}>{(start || startedBefore) ? def : "Definition"}</p>
        </div>
        {/* Definition */}

        {/* Options */}
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
            {(start || startedBefore) ? opt_1 : "A"}
          </button>
          <button
            className="app_def_option"
            disabled={disabledOpt}
            onClick={() => {
              handleOption(opt_2);
            }}
          >
            {(start || startedBefore) ? opt_2 : "B"}
          </button>
          <button
            className="app_def_option"
            disabled={disabledOpt}
            onClick={() => {
              handleOption(opt_3);
            }}
          >
            {(start || startedBefore) ? opt_3 : "C"}
          </button>
          <button
            className="app_def_option"
            disabled={disabledOpt}
            onClick={() => {
              handleOption(opt_4);
            }}
          >
            {(start || startedBefore) ? opt_4 : "D"}
          </button>
        </div>
        {/* Options */}

        {/* Controls */}
        <Controls drill={drill} disableDrill={disableDrill} />
        {/* Controls */}
      </TestSectionContext.Provider>
    </div>
  );
}

export default TestSection;
