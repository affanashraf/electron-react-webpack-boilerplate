import React, { useContext } from "react";
import Dialog from "../../Utils/Dialog";
import _ from "lodash";
import fse from "fs-extra";
import XLSX from "xlsx";
import electron from "electron";
import RangeContext from "../../contexts/RangeContext";
import GlobalContext from "../../contexts/GlobalContext";
import TestSectionContext from "../../contexts/TestSectionContext";
function Controls(props) {
  const [data, setData] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [func, setFunc] = React.useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const { drill, stop } = useContext(TestSectionContext);
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
  const getJsonData = () => {
    let promise = new Promise((resolve, reject) => {
      electron.remote.dialog
        .showOpenDialog({
          filters: [{ name: "JSON File", extensions: ["json"] }],
        })
        .then((res) => {
          let path = res.filePaths[0];
          let data = fse.readJSONSync(path);
          resolve(data);
        })
        .catch((err) => reject(err));
    });
    return promise;
  };
  const setInitialSetup = (data) => {
    setRanges(data.ranges);
    setWords(data.words);
    setDefs(data.defs);
    setTotalWords(data.defs.length);
    setImported(true);
    console.log("SET STATE");
  };
  const resetState = () => {
    setRanges([]);
    setWords([]);
    setDefs([]);
    setTotalWords(0);
    setPoolIndexes([]);
    setImported(false);
    document.getElementById("csv_form").reset();
    console.log("RESET STATE");
  };
  //
  const isValidFormat = (data) => {
    let row = data[0];
    let arr = _.keysIn(row);
    console.log(arr);
    if (arr.length === 2) {
      let word = arr[0].toLowerCase();
      let def = arr[1].toLowerCase();
      if (word === "word" && def === "definition") {
        return true;
      }
      return false;
    } else false;
  };
  const setDataKeys = (data) => {
    let word = "";
    let def = "";
    let arr = data.map((row) => {
      let keys = _.keysIn(row);
      if (keys[0].toLowerCase() === "word") word = row[keys[0]];
      else if (keys[1].toLowerCase() === "word") word = row[keys[1]];

      if (keys[0].toLowerCase() === "definition") def = row[keys[0]];
      else if (keys[1].toLowerCase() === "definition") def = row[keys[1]];

      return { word: word, def: def };
    });
    setData(arr);
    setTotalWords(arr.length);
    return arr;
  };
  const setGlobalData = (data) => {
    console.log("**");
    let arr = setDataKeys(data);
    console.log(arr);
    let words = [];
    let defs = [];
    arr.forEach((row) => {
      words.push(row.word);
      defs.push(row.def);
    });
    setImported(true);
    setWords(words);
    setDefs(defs);
    setRanges([]);
    setPoolIndexes([]);
  };
  const readExcelFile = (file) => {
    let data;
    try {
      data = XLSX.readFile(file);
    } catch (e) {
      console.log(e);
      return;
    }

    let arr = _.keysIn(data.Sheets);
    let sheet = _.pick(data.Sheets, [arr[0]]);
    console.log(sheet);
    let response = XLSX.utils.sheet_to_json(sheet[arr[0]]);
    let valid = isValidFormat(response);
    if (!valid) {
      alert(
        "CSV or XLSX wrong format.\nFile must contain only two fields(Word , Definition)!!"
      );
      return;
    }
    setGlobalData(response);
  };
  //
  const handleSave = (data) => {
    let promise = new Promise(async (resolve, reject) => {
      console.log("ENTER SAVE");
      electron.remote.dialog
        .showSaveDialog({
          filters: [{ name: "JSON File", extensions: ["json"] }],
        })
        .then((res) => {
          let path = res.filePath;
          console.log(path);
          fse.writeJSONSync(path, data);
          resolve("WorkFile saved successfully...");
        })
        .catch((err) => reject(err));
    });
    return promise;
  };
  const handleNew = async () => {
    if (imported) {
      setOpen(true);
      setFunc("new");
    }
  };
  const handleOpen = () => {
    if (!imported) {
      getJsonData()
        .then((data) => {
          resetState();
          setInitialSetup(data);
        })
        .catch((err) => {
          // Original state
        });
    } else if (imported) {
      setOpen(true);
      setFunc("open");
    }
  };
  const handleExit = () => {
    if (imported) {
      setOpen(true);
      setFunc("exit");
    } else {
      let w = electron.remote.getCurrentWindow();
      w.close();
    }
  };
  //
  const onYes = async () => {
    let arr = ranges.map((range) => ({ ...range, selected: false }));
    let data = {
      ranges: arr,
      words: words,
      defs: defs,
    };
    if (func !== "" && func === "open") {
      handleClose();
      handleSave(data)
        .then((res) => {
          console.log(res);
          getJsonData()
            .then((data) => {
              resetState();
              setInitialSetup(data);
            })
            .catch((err) => {
              // Original state
            });
        })
        .catch((err) => {
          // Origignal state
        });
    } else if (func !== "" && func === "new") {
      handleClose();
      handleSave(data)
        .then((res) => {
          resetState();
        })
        .catch((err) => {
          // Original state
        });
    } else if (func !== "" && func === "exit") {
      handleClose();
      handleSave(data)
        .then((res) => {
          let w = electron.remote.getCurrentWindow();
          w.close();
        })
        .catch((err) => {
          // Original state
        });
    }
  };
  const onNo = async () => {
    handleClose();
    if (func !== "" && func === "open") {
      getJsonData()
        .then((data) => {
          resetState();
          setInitialSetup(data);
        })
        .catch((err) => {
          // Original state
        });
    } else if (func !== "" && func === "new") {
      resetState();
    } else if (func !== "" && func === "exit") {
      let w = electron.remote.getCurrentWindow();
      w.close();
    }
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px",
      }}
    >
      <button
        className="circle_btn"
        disabled={props.disableDrill}
        onClick={() => {
          if (!start) {
            drill()
          } else {
            stop()
          }
        }}
      >
        {start ? "Stop" : "Drill"}
      </button>
      <button className="blue_btn" onClick={handleNew}>
        New Database
      </button>
      <button className="blue_btn" onClick={handleOpen}>
        Open Database
      </button>
      <button
        className="blue_btn"
        onClick={() => {
          if (imported) {
            let arr = ranges.map((range) => ({ ...range, selected: false }));
            let data = {
              ranges: arr,
              words: words,
              defs: defs,
            };
            handleSave(data)
              .then((res) => {
                resetState();
              })
              .catch((err) => {
                // Original state
              });
          }
        }}
      >
        Save Database
      </button>
      <button className="circle_btn" onClick={handleExit}>
        Exit
      </button>
      <Dialog open={open} onCancel={handleClose} onYes={onYes} onNo={onNo} />
    </div>
  );
}

export default Controls;
