const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use("/api/v1/ticekts", require("./routes"));

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Success!" });
});

app.use((req, res, next) => {
  const error = new Error("Resource not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.log(error);
  if (!error.status) {
    return res.status(404).json({ message: error.message });
  }

  res.status(500).json({ message: "Something went wrong" });
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})