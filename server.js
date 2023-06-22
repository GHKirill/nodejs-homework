const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config();
const app = require("./app");
const { DB_HOST, PORT = 3000 } = process.env;
// console.log(DB_HOST);
// const HOST =
//   "mongodb+srv://Kirill:mCq99L4p1cy8bD5Q@cluster0.3ebso04.mongodb.net/contacts-DataBase?retryWrites=true&w=majority";
// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Server running. Use our API on port: 3000");
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
