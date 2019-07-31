/* eslint-disable */
(async () => {
  try {
    await require("./app/db")();
    require("./app/app")();
  } catch (error) {
    console.error(`server bootstrap failed:: `, error);
    process.exit(1);
  }
})();
