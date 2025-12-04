import express from "express";
import data from "./data/mockdata.json" assert { type: "json" };

const app = express();

const PORT = 3000;

//Using Public folder
app.use(express.static("public"));

//Using Images folder at route /images
app.use("/images", express.static("images"));

//GET
app.get("/", (request, response) => {
  response.json(data);
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
  console.log(`The server is running on port ${PORT}`);
  //console.log(data);
});
