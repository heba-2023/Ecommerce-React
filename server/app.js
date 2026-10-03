const express = require("express");
const app = express();
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");

app.use(express.json());
app.use("/api/v1/categories", require("./routes/categoryRoute"));
app.use("/api/v1/auth", require("./routes/authRoute"));
app.use((req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 404));
});
app.use(globalError);
module.exports = app; // بنصدر الـ app بس
