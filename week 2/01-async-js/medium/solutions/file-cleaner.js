const fs = require("fs");

fs.readFile("file.txt", "utf-8", (err, data) => {
  const modifiedData = data.replace(/\s+/g, " ");
  fs.writeFile('file.txt', modifiedData, "utf8", (writeErr) => {
    if (writeErr) {
      console.error("Error writing to the file:", writeErr);
      return;
    }
    console.log("File has been successfully modified and saved.");
  });
});
