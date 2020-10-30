import React, { useContext } from "react";
import Dialog from "../../Utils/Dialog";
import _ from "lodash";
import fs from "fs";
import XLSX from "xlsx";
import electron, { app } from "electron";
import RangeContext from "../../contexts/RangeContext";
import GlobalContext from "../../contexts/GlobalContext";
function Controls(props) {
  const [data, setData] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [func, setFunc] = React.useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const {
    ranges,
    setRanges,
    setTotalWords,
    totalWords,
    setPoolIndexes,
  } = useContext(RangeContext);
  const {
    words,
    defs,
    imported,
    setImported,
    isSaved,
    setIsSaved,
    setWords,
    setDefs,
  } = useContext(GlobalContext);
  let operation;
  const getJsonData = async () => {
    let data;
    try {
      let res = await electron.remote.dialog.showOpenDialog({
        filters: [{ name: "JSON File", extensions: ["json"] }],
      });
      console.log(res.filePaths[0]);
      data = fs.readFileSync(res.filePaths[0], "utf8");
      data = JSON.parse(data);
    } catch (e) {
      console.log(e);
      return -1;
    }
    return data;
  };
  const setInitialSetup = (data) => {
    setRanges(data.ranges);
    setWords(data.words);
    setDefs(data.defs);
    setTotalWords(data.defs.length);
  };
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
    setPoolIndexes([])
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
  const handleSave = async () => {
    if (imported && !isSaved) {
      let arr = ranges.map((range) => ({ ...range, selected: false }));
      let data = {
        ranges: arr,
        words: words,
        defs: defs,
      };
      let path = await electron.remote.dialog.showSaveDialog({
        filters: [
          {
            name: "Json File",
            extensions: ["json"],
          },
        ],
      });
      fs.writeFile(path.filePath, JSON.stringify(data), (err) => {
        if (err !== null) {
          alert(err.message);
          return;
        }
        alert("Data stored successfully..");
        setIsSaved(true);
      });
    } else {
    }
  };
  const handleNew = async () => {
    if (!imported && !isSaved) {
      let res = await electron.remote.dialog.showOpenDialog({
        filters: [{ name: "CSV/XLSX File", extensions: ["csv", "xlsx"] }],
      });
      readExcelFile(res.filePaths[0]);
    } else if (imported && isSaved) {
      let res = await electron.remote.dialog.showOpenDialog({
        filters: [{ name: "CSV/XLSX File", extensions: ["csv", "xlsx"] }],
      });
      readExcelFile(res.filePaths[0]);
    } else if (imported && !isSaved) {
      setOpen(true);
      setFunc("new");
    }
  };
  const handleOpen = async () => {
    if (!imported && !isSaved) {
      // Open
      let data = await getJsonData();
      if (data !== -1 && data !== undefined) {
        console.log(data);
        setInitialSetup(data);
        setImported(true);
        // setIsSaved(true);
      } else {
        alert("No such file selected or data not found!!");
        return;
      }
    } else if (imported && isSaved) {
      // Open
      let data = await getJsonData();
      if (data !== -1 && data !== undefined) {
        console.log(data);
        setInitialSetup(data);
      } else {
        alert("No such file selected or data not found!!");
      }
    } else if (imported && !isSaved) {
      // Save
      setOpen(true);
      setFunc("open");
      //   // Open
    }
  };
  const handleExit = () => {
    if (imported && !isSaved) {
      setOpen(true);
      setFunc("exit");
    } else if (!imported) {
      // Exit
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
          console.log("drill");
          props.drill();
        }}
      >
        Drill
      </button>
      <button className="blue_btn" onClick={handleNew}>
        New Database
      </button>
      <button className="blue_btn" onClick={handleOpen}>
        Open Database
      </button>
      <button className="blue_btn" onClick={handleSave}>
        Save Database
      </button>
      <button className="circle_btn" onClick={handleExit}>
        Exit
      </button>
      <Dialog
        open={open}
        onCancel={handleClose}
        onYes={async () => {
          await handleSave();
          handleClose();
          if (func !== "" && func === "open") {
            let data = await getJsonData();
            if (data !== -1 && data !== undefined) {
              console.log(data);
              setInitialSetup(data);
            } else {
              alert("No such file selected or data not found!!");
            }
          } else if (func !== "" && func === "new") {
            let res = await electron.remote.dialog.showOpenDialog({
              filters: [{ name: "CSV/XLSX File", extensions: ["csv", "xlsx"] }],
            });
            readExcelFile(res.filePaths[0]);
          } else if (func !== "" && func === "exit") {
            let w = electron.remote.getCurrentWindow(); 
            w.close();
          }
        }}
        onNo={async () => {
          handleClose();
          if (func !== "" && func === "open") {
            let data = await getJsonData();
            if (data !== -1 && data !== undefined) {
              console.log(data);
              setInitialSetup(data);
            } else {
              alert("No such file selected or data not found!!");
            }
          } else if (func !== "" && func === "new") {
            let res = await electron.remote.dialog.showOpenDialog({
              filters: [{ name: "CSV/XLSX File", extensions: ["csv", "xlsx"] }],
            });
            readExcelFile(res.filePaths[0]);
          } else if (func !== "" && func === "exit") {
            let w = electron.remote.getCurrentWindow();
            w.close();
          }
        }}
      />
    </div>
  );
}

export default Controls;
