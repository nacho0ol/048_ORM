"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

app.post("/Komik", async (req, res) => {
  const data = req.body;
  try {
    const Komik = await db.Komik.create(data);
    res.send(Komik);
  } catch (err) {
    res.send(err);
  }
});

app.get("/Komik", async (req, res) => {
  try {
    const Komiks = await db.Komik.findAll();
    res.send(Komiks);
  } catch (err) {
    res.send(err);
  }
});

app.put("/Komik/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const Komik = await db.Komik.findByPk(id);
    if (!Komik) {
      return res.status(404).send("Komik not found");
    }
    await Komik.update(data);
    res.send({ message: "Komik updated successfully", Komik });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/Komik/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const Komik = await db.Komik.findByPk(id);
    if (!Komik) {
      return res.status(404).send("Komik not found");
    }
    await Komik.destroy();
    res.send({ message: "Komik deleted successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
});
