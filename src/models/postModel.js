const mongoose = require("mongoose");

//................................. Create post schema .........................//
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    authorId: {
      // ObjectId is used to reference authorModel
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    image: {
      type: String,
    },
    likeByAuthors: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
