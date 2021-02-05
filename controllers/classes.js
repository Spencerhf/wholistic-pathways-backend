const classes = require("../models").classes;

module.exports = {
  async create(req, res) {
    if (!req.body.name || req.body.name == null) {
      res.status(407).send("Enter a class name.");
    }
    return classes
      .create({
        name: req.body.name,
        date: req.body.date,
        time: req.body.time,
        spots: req.body.spots,
      })
      .then((classes) => res.status(201).send(classes))
      .catch((error) => res.status(400).send(error));
  },

  async getClasses(req, res) {
    return classes
      .findAll()
      .then((schedule) => res.json(schedule))
      .catch((e) => res.status(500).send(e));
  },

  // async update(req, res) {
  //   return classes
  //     .findAll()
  //     .then((updated) => res.status(200).send(updated))
  //     .catch((e) => res.status(500).send(e));
  // },
};
