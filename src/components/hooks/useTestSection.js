import { useContext, useState, useEffect } from "react";
import RangeContext from "../contexts/RangeContext";
import GlobalContext from "../contexts/GlobalContext";
import _ from "lodash";
function useTestSection() {
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
  //Score
  const [right, setRight] = useState(0);
  const [wrong, setWrong] = useState(0);
  // Options
  const [opt_1, setOpt_1] = useState("A");
  const [opt_2, setOpt_2] = useState("B");
  const [opt_3, setOpt_3] = useState("C");
  const [opt_4, setOpt_4] = useState("D");
  // Word & Definition
  const [word, setWord] = useState("");
  const [def, setDef] = useState("Definition");
  // Pool
  const [pool, setPool] = useState([]);
  // W&D Counter
  const [counter, setCounter] = useState(0);
  // Time Counter
  const [timeCount, setTimeCount] = useState(0);
  // Selected Option
  const [option, setOption] = useState("");
  // Options buttons disable
  const [disabledOpt, setDisabledOpt] = useState(true);
  //Drill button disable
  const [disableDrill, setDisableDrill] = useState(true);
  const [startedBefore, setStartedBefore] = useState(false);
  //
  let timeout;
  //Initialize
  const init = () => {
    setDefault();
    if (poolIndexes !== undefined && poolIndexes.length >= 4) {
      setDisableDrill(false);
      let poolArr = poolIndexes.map((index) => {
        let w = words[index];
        let d = defs[index];
        return {
          word: w,
          def: d,
        };
      });
      setPool(poolArr);
    }
  };
  //
  const drill = () => {
    if (pool.length > 4) {
      setStart(true);
      setTimeCount(time);
      setStartedBefore(false);
      //
      setDisabledOpt(false);
      setDefinition();
      // setTimeout(() => {
      //   setDefinition();
      // }, time * 1000);
    }
  };
  const stop = () => {
    clearTimeout(timeout);
    setStart(false);
    setStartedBefore(true);
    // console.log("stop")
  };
  useEffect(() => {
    if (start) {
      timeout = setTimeout(() => {
        if (timeCount === 0) {
          setScore();
          setTimeCount(time);
          setDefinition();
        } else if (timeCount > 0) {
          setTimeCount(timeCount - 1);
        }
      }, 1000);
    }
  }, [timeCount, start]);

  useEffect(() => {
    init();
  }, [poolIndexes, time]);

  //
  const setDefinition = () => {
    console.log("Def**");
    if (pool.length > 4) {
      //
      let c = counter;
      let p = pool;
      if (counter === pool.length) {
        setCounter(0);
        c = 0;
      } else {
        setCounter(counter + 1);
      }
      //
      let answer = p[c].word;
      setWord(p[c].word);
      setDef(p[c].def);
      //
      let wordArr = words.filter((w) => w !== answer);
      wordArr = shuffle(wordArr);
      wordArr = wordArr.slice(0, 3);
      wordArr.push(answer);
      wordArr = _.shuffle(wordArr);
      //
      setOpt_1(wordArr[0]);
      setOpt_2(wordArr[1]);
      setOpt_3(wordArr[2]);
      setOpt_4(wordArr[3]);
      //
    }
  };
  //
  const setScore = () => {
    if (option === word) {
      setRight(right + 1);
    } else {
      setWrong(wrong + 1);
    }
  };
  //
  const setDefault = () => {
    setDef("Definition");
    setOpt_1("A");
    setOpt_2("B");
    setOpt_3("C");
    setOpt_4("D");

    setRight(0);
    setWrong(0);

    setCounter(0);
    setStart(false);
    clearTimeout(timeout);
    setTimeCount(undefined);

    setOption("");
  };
  //
  const handleOption = (value) => {
    if (timeCount !== time) {
      clearTimeout(timeout);
      setTimeCount(time);
    }
    //
    setOption(value);
    //
    if (word === value) {
      let r = right;
      r++;
      setRight(r);
    } else {
      let w = wrong;
      w++;
      setWrong(w);
    }
    setDefinition();
  };
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  return {
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
  };
}

export default useTestSection;
