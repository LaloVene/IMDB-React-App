const express = require("express");
const fs = require("fs");

const PORT = process.env.PORT || 3001;
const app = express();

app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

const newPet = {
  pet4: {
    name: "nala",
    type: "dog",
    owner: "eldelcesar",
    color: "salt and peper",
    id: 4,
  },
};

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/pets", (req, res) => {
  fs.readFile(__dirname + "/" + "pets.json", "utf8", (err, data) => {
    console.log(data);
    res.end(data);
  });
});

app.post("/addPet", (req, res) => {
  fs.readFile(__dirname + "/" + "pets.json", "utf8", (req, data) => {
    data = JSON.parse(data);
    data["pet4"] = newPet["pet4"];
    console.log(data);
    fs.writeFile(__dirname + "/" + "pets.json", JSON.stringify(data), (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
    res.end(JSON.stringify(data));
  });
});

app.put("/changePetName", (req, res) => {
  fs.readFile(__dirname + "/" + "pets.json", "utf8", (reqRead, data) => {
    data = JSON.parse(data);
    const { nameId, name } = req.body;
    data[nameId]["name"] = name;
    fs.writeFile(__dirname + "/" + "pets.json", JSON.stringify(data), (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
    res.end(JSON.stringify(data));
  });
});

app.delete("/deletePet", (req, res) => {
  fs.readFile(__dirname + "/" + "pets.json", "utf8", (reqRead, data) => {
    data = JSON.parse(data);
    const { name } = req.body;
    delete data[name];
    fs.writeFile(__dirname + "/" + "pets.json", JSON.stringify(data), (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
    res.end(JSON.stringify(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
