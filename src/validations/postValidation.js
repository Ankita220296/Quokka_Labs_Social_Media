const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const { isValidBody, isValidField } = require("./commonValidation");

const isValidImage = (value) => /.+\.(?:(jpg|gif|png|jpeg|jfif))/.test(value);

const validateCreatePost = async (req, res, next) => {
  try {
    const data = req.body;
    const { title, description } = data;

    const postImage = req.files;
    if (!postImage || postImage.length === 0) {
      return res
        .status(400)
        .send({ status: false, message: "Image is missing" });
    } else if (postImage.length > 1) {
      return res
        .status(400)
        .send({ status: false, message: "Please upload only one image" });
    }

    if (!isValidImage(postImage[0].originalname)) {
      return res.status(400).send({
        status: false,
        message:
          "Please upload only image file with extension jpg, png, gif, jpeg, jfif",
      });
    }

    if (!isValidBody(data)) {
      return res.status(400).send({ status: false, message: "Missing data" });
    }

    if (!title) {
      return res.status(400).send({
        status: false,
        message: "Please provide title",
      });
    }
    if (!isValidField(title)) {
      return res.status(400).send({
        status: false,
        message: "Invalid Title",
      });
    }

    if (!description) {
      return res.status(400).send({
        status: false,
        message: "Please provide description",
      });
    }

    if (!isValidField(description)) {
      return res.status(400).send({
        status: false,
        message: "Invalid description",
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
  next();
};

const validateLikePost = async (req, res, next) => {
  try {
    const data = req.body;
    const {postId } = data;

    if (!isValidBody(data)) {
      return res.status(400).send({ status: false, message: "Missing data" });
    }

    if (!ObjectId.isValid(postId)) {
      return res
        .status(400)
        .send({ status: false, message: "PostId is not valid" });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
  next();
};

module.exports = { validateCreatePost, validateLikePost };
