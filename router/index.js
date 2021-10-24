const express = require("express");
const Joi = require("joi");
const router = express();
const data = require("../data/gym-data");

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/login", (req, res) => {
  res.send("welocme to Gymfit");
});

router.post("/login", async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required(),
  });
  console.log("Req.body = ", req.body);
  try {
    const data = await schema.validateAsync(req.body);
    console.log(" schema validate value", data);
    res.status(200).send({ message: "success", data: req.body });
  } catch (err) {
    console.log(err);
  }
});
router.post("/register", async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().min(4).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required(),
    mobile: Joi.string().min(10).max(10),
  });
  const data = await schema.validateAsync(req.body);
  console.log("register  = ", data);

  res.status(200).send({ message: "success", data: req.body });
});

router.get("/gyms/:id", function (req, res) {
  gymById = data.find((gym) => {
    return req.params.id == gym.id;
  });
  res.status(200).json(gymById);
});

router.get("/gyms", (req, res) => {
  console.log(JSON.stringify(req.query));
  const { id, rating, price, filter } = req.query;
  var result = {};
  if (filter == "above") {
    if (id) {
      result = data.filter((gym) => {
        return gym.id >= id;
      });
    } else if (rating) {
      result = data.filter((gym) => {
        return gym.rating >= rating;
      });
    } else if (price) {
      result = data.filter((gym) => {
        return gym.price >= price;
      });
    } else {
      result = data;
    }
  } else if (filter == "below") {
    if (id) {
      result = data.filter((gym) => {
        return gym.id <= id;
      });
    } else if (rating) {
      result = data.filter((gym) => {
        return gym.rating <= rating;
      });
    } else if (price) {
      result = data.filter((gym) => {
        return gym.price <= price;
      });
    } else {
      result = data;
    }
  } else if (id) {
    result = data.find((gym) => {
      return gym.id == id;
    });
  } else {
    result = data;
  }
  res.status(200).json(result);
});

module.exports = router;
