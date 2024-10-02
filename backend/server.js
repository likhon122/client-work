const app = require("./app");
const sequelize = require("./database");
const { port } = require("./secret");

app.listen(port, () => {
  sequelize
    .sync()
    .then(() => {
      console.log("Database connected and synced.");
    })
    .catch((err) => {
      console.error("Unable to sync database:", err);
    });
  console.log(`Server is running on http://localhost:${port}`);
});
