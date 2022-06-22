const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");

const DUMMY_DATA = [
  {
    id: "u1",
    name: "Bilal ARKAN",
    username: "05300334018",
    role: "user",
    active: true,
    password: "test",
  },
  {
    id: "u2",
    name: "Sevgi ARKAN",
    username: "05305989586",
    role: "user",
    active: true,
    password: "test",
  },
];

exports.getAllUser = (req, res, next) => {
  res.status(200).json({ users: DUMMY_DATA });
};

exports.getUserById = (req, res, next) => {
  const userId = req.params.uid;
  const user = DUMMY_DATA.find((u) => {
    return u.id === userId;
  });

  if (!user) {
    throw new HttpError("Could not find user with provided id", 404);
  }
  res.json({ user });
};

exports.signup = (req, res, next) => {
  const { username, password } = req.body;

  const hasUser = DUMMY_DATA.find((u) => u.username === username);

  if (hasUser) {
    return next(
      new HttpError("There is already a user with the provided username", 422)
    );
  }

  const newUser = {
    username,
    password,
    role: "user",
    active: true,
    name: req.body.name || "",
    id: uuidv4(),
  };

  DUMMY_DATA.push(newUser);
  res.status(201).json({ newUser });
};

exports.login = (req, res, next) => {
  const { username, password } = req.body;
  const user = DUMMY_DATA.find((user) => user.username === username);

  if (!user || user.password !== password) {
    return next(new HttpError("Could not find user or wrong credentials", 404));
  }

  res.status(200).json({ message: "logged in", username, password });
};
