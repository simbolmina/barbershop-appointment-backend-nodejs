const HttpError = require("../models/http-error");

const DUMMY_DATA = [
  {
    id: "u1",
    name: "Bilal ARKAN",
    username: "05300334018",
    role: "user",
    active: true,
    password: "test",
  },
];

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
