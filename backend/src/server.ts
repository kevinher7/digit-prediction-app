import express from "express";

const app = express();

const PORT = 8050;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
