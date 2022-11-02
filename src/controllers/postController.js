const postModel = require("../models/postModel");
const uploadFile = require("../middleware/aws");
const authorModel = require("../models/authorModel");

// Create post
const createPost = async (req, res) => {
  try {
    const postDetails = req.body;
    postDetails.authorId = req.headers["authorId"];
    let postImage = req.files;

    // NOTE : Currently i don't have AWS account so commented this code. Use your AWS account and uncomment below lines to upload file
    // const uploadedFileURL = await uploadFile.uploadFile(postImage[0]);
    // postDetails.postImage = uploadedFileURL;

    const data = await postModel.create(postDetails);
    res.status(201).send({ status: true, data });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

// Like post using authorId and postId
const likePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const authorId = req.headers["authorId"];

    await postModel.findOneAndUpdate(
      { _id: postId },
      { $push: { likeByAuthors: authorId } },
      { new: true }
    );
    res.status(201).send({ status: true, message: "Post liked" });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

const getAuthorDetails = async (authorId) => {
  const details = await authorModel
    .findOne({
      _id: authorId,
    })
    .select({ fName: 1, lName: 1 });
  return details;
};

// Get all post
const getPosts = async (req, res) => {
  try {
    const data = await postModel.find().populate("authorId", "fName lName");
    const authorIds = data.map((item) => item.likeByAuthors).flat();
    const authors = await Promise.all(
      authorIds.map((id) => getAuthorDetails(id))
    );
    const response = data.map((item) => {
      const likeByAuthors = item.likeByAuthors.map((id) => {
        return authors.find((author) => author._id.toString() === id).toJSON();
      });
      return { ...item.toJSON(), likeByAuthors };
    });

    return res.status(200).send({
      status: true,
      data: response,
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

// Get loggedIn author's posts
const getAuthorPosts = async (req, res) => {
  try {
    const authorId = req.headers["authorId"];
    const data = await postModel.find({ authorId: authorId });
    return res.status(200).send({
      status: true,
      data,
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = { createPost, likePost, getPosts, getAuthorPosts };
