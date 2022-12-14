const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    content: {
      type: String,
    //   required: [true, "You must provide a reason for your review score."],
    },
    cake: {
      type: mongoose.Types.ObjectId,
      ref: "Cake",
    },
  },
  { timestamps: true }
);


const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;