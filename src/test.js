const fse = require("fs-extra");
const { dialog } = require("electron").remote;

dialog
  .showSaveDialog({
    filters: [
      {
        name: "Json File",
        extensions: ["json"],
      },
    ],
  })
  .then((res) => console.log(res.filePath))
  .catch((err) => console.log(err));
// fse.writeJSONSync();
