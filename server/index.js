
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db.connect");
const app = require("./app"); 

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to database", err);
  });