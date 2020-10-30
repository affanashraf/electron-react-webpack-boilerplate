import React, { useContext } from "react";
import XLSX from "xlsx";
import _ from "lodash";
import RangeContext from "../contexts/RangeContext";
import GlobalContext from "../contexts/GlobalContext";
function InputExcelCSV(props) {
  const { setTotalWords } = useContext(RangeContext);
  const { setWords, setDefs,setImported, imported } = useContext(GlobalContext);
  const [data, setData] = React.useState([]);
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
    setImported(true);
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
    setWords(words);
    setDefs(defs);
  };
  const readExcelFile = (file) => {
    let data = XLSX.readFile(file.path);
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
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <label htmlFor="inputData" style={{ fontSize: "20px", padding: "5px" }}>
        Import Data
      </label>
      <input
        className="input_csv_xlsx"
        id="inputData"
        disabled={imported}
        placeholder="kghkggv"
        type="file"
        accept=".xlsx,.csv"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcelFile(file);
        }}
      />
    </div>
  );
}

export default InputExcelCSV;
