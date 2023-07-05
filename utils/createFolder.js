const fs = require("fs");

const createFolderIfNotExist = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
    console.log(`Folder ${folder} is created`);
  }
};
module.exports = createFolderIfNotExist;
