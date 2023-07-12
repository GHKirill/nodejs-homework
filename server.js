const mongoose = require("mongoose");
const path = require("path");
const { createFolderIfNotExist } = require("./utils");
const app = require("./app");
const { DB_HOST, PORT = 3000 } = process.env;
const tempFolderPath = path.join(__dirname, "temp");
const publicFolderPath = path.join(__dirname, "public");
const avatarsFolderPath = path.join(__dirname, "public", "avatars");

const connectDB = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log(`Server running. Use our API on port: ${PORT}`);
    app.listen(PORT, () => {
      createFolderIfNotExist(tempFolderPath);
      createFolderIfNotExist(publicFolderPath);
      createFolderIfNotExist(avatarsFolderPath);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
connectDB();
