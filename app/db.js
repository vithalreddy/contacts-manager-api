const mongoose = require("mongoose");

module.exports = () =>
  new Promise(async (resolve, reject) => {
    try {
      const { dbUrl, env } = require("../config");
      mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useCreateIndex: true
      });
      const db = mongoose.connection;
      db.on("error", console.error.bind(console, "mongoose conn err::"));
      db.once("open", () => {
        console.info("Mongoose Conn Successfully Connected.");
      });

      // print mongoose logs in dev env
      if (env != "production") {
        mongoose.set("debug", (collectionName, method, query, doc) => {
          console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
        });
      }

      resolve();
    } catch (error) {
      reject(error);
    }
  });
