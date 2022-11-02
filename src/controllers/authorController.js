const authorModel = require("../models/authorModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create an author
const createAuthor = async (req, res) => {
  try {
    const authorDetails = req.body;
    const data = await authorModel.create(authorDetails);
    res
      .status(201)
      .send({ status: true, message: "Author created successfully", data });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

// Login author using email and password. Generate JWT token and send it to the response
const loginAuthor = async (req, res) => {
  try {
    // Generate JWT token using authorId and secret
    const token = jwt.sign(
      {
        authorId: req.headers.authorId,
      },
      process.env.JWT_TOKEN,
      { expiresIn: "3h" }
    );
    res.status(200).send({ status: true, message: "Success", data: token });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { createAuthor, loginAuthor };
