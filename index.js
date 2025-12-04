import express from "express";
import data from "./data/mockdata.json" assert { type: "json" };
import requestTime from "./middleware/middleware.js";
// import dogs from "./data/dogs.json" assert { type: "json" };

const app = express();

const PORT = 3000;

//Using Images folder at virtual path /images
app.use("/images", express.static("images"));

//Using express.json and express.urlencoded
//app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestTime);

//GET
app.get("/", (req, res) => {
  res.json(data);
});

//POST - express.json and express.urlencoded
app.post("/item", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

//GET
app.get(
  "/nextexample",
  (req, res, next) => {
    console.log("response will be sent by next function");
    next();
  },
  (req, res) => {
    res.send("Here's that response from the second callback.");
  }
);

app.get("/download", (req, res) => {
  res.download("images/Doodle.png");
});

app.get("/redirect", (req, res) => {
  res.redirect("http://www.google.com");
});

app.get("/reqtime", (req, res) => {
  let resText = `Request requested at ${req.requestTime}`;
  res.send(resText);
});

//GET with routing parameters
app.get("/class/:id", (req, res) => {
  const studentId = Number(req.params.id);
  const student = data.filter((student) => student.id === studentId);
  res.send(student);
});

// app.get("/dogs", (req, res, next) => {
//   res.json(dogs);
// });

//ROUTE CHAINING
app
  .route("/class")
  .get((req, res) => {
    // res.send("Retrieve class info");
    throw new Error();
  })
  .post((req, res) => {
    res.send("Create class info");
  })
  .put((req, res) => {
    res.send("Update class info");
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

//Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something is broken!");
});

app.listen(PORT, () => {
  console.log(`🚀 The server is running on port ${PORT} 🚀`);
});
