import express from "express";
import data from "./data/mockdata.json" assert { type: "json" };
import dogs from "./data/dogs.json" assert { type: "json" };
import requestTime from "./middleware/middleware.js";

const app = express();

const PORT = 3000;

//Using Images folder at virtual path /images
app.use("/images", express.static("images"));

app.use(requestTime);

//GET
app.get("/", (req, res) => {
  res.json(data);
});

app.get("/reqtime", (req, res) => {
  let resText = `Request requested at ${req.requestTime}`;
  res.send(resText);
});

app.get(/.*fly$/, (req, res) => {
  res.send("/.*fly$/");
});

app.get("/dogs", (req, res, next) => {
  res.json(dogs);
});

//POST
app.post("/create", (request, response) => {
  response.send("This is POST request at /create");
});

//PUT
app.put("/edit", (request, response) => {
  response.send("This is a PUT request at /edit");
});

//DELETE
app.delete("/delete", (request, response) => {
  response.send("This is a DELETE request at /delete");
});

app.listen(PORT, () => {
  console.log(`🚀 The server is running on port ${PORT} 🚀`);
  //console.log(data);
});
