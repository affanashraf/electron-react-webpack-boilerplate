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
  const [counter, setCounter] = useState(undefined);
  // Time Counter
  const [timeCount, setTimeCount] = useState(undefined);
  // Selected Option
  const [option, setOption] = useState("");
  // Options buttons disable
  const [disabledOpt, setDisabledOpt] = useState(true);
  //Drill button disable
  const [disableDrill, setDisableDrill] = useState(true);
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
    setDisableDrill(true);
    if (pool.length > 4) {
      setStart(true);
      setTimeCount(time);
      //
      setDisabledOpt(false);
      setDefinition();
      setTimeout(() => {
        setDefinition();
      }, 5000);
    }
  };
  //
  const setDefinition = () => {
    if (pool.length > 4) {
      console.log("Counter setted");
      console.log("counter : " + counter);
      //
      let c = counter;
      let p = pool;
      if (counter === pool.length) {
        setCounter(0);
        c = 0;
        // p = shuffle(pool);
        // if (p[c] === pool[pool.length - 1]) {
        //   c++;
        // }
        // setPool(_.shuffle(p));
      } else {
        setCounter(counter + 1);
      }
      //
      console.log("Set Definition");
      let answer = p[c].word;
      setWord(p[c].word);
      setDef(p[c].def);
      //
      console.log("Randomize");
      let wordArr = words.filter((w) => w !== answer);
      wordArr = wordArr.slice(0, 3);
      wordArr.push(answer);
      wordArr = _.shuffle(wordArr);
      //
      console.log("Set Options");
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
  useEffect(() => {
    console.log("pre-timer");
    if (start) {
      console.log("timer");
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
  }, [timeCount]);

  useEffect(() => {
    init();
  }, [poolIndexes, time]);

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
