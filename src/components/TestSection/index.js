import React, { useContext } from "react";
import "./TestSection.css";
import RangeContext from "../contexts/RangeContext";
import GlobalContext from "../contexts/GlobalContext";
import TestSectionContext from "../contexts/TestSectionContext";
import useTestSection from "../hooks/useTestSection";
import _ from "lodash";
//
import Header from "./Components/Header";
import Definition from "./Components/Definition";
import Controls from "./Components/Controls";
import DefOptions from "./Components/DefOptions";

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
      <TestSectionContext.Provider value={{}}>
        {/* Header > Score, Title, Timer */}
        <Header />
        {/* Header */}

        {/* Definition */}
        <Definition />
        {/* Definition */}

        {/* Options */}
        <DefOptions />
        {/* Options */}

        {/* Controls */}
        <Controls drill={drill} disableDrill={disableDrill} />
        {/* Controls */}
      </TestSectionContext.Provider>
    </div>
  );
}

export default TestSection;
