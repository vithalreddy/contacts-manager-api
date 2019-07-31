const mongoose = require("mongoose");

module.exports = () =>
  new Promise(async (resolve, reject) => {
    try {
      const { dbUrl } = require("../config");
      mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useCreateIndex: true
      });
      const db = mongoose.connection;
      db.on("error", console.error.bind(console, "mongoose conn err::"));
      db.once("open", () => {
        console.info("Mongoose Conn Successfully Connected.");
      });

      resolve();
    } catch (error) {
      reject(error);
    }
  });
