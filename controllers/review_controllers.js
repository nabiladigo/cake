const express = require('express');
const router= express.Router();
const { Cake, Review } = require("../models");

// Review.deleteMany({}, function (error, deletedReviews) {
//   if (error) {
//     return console.log(error);
//   }
//   Review.insertMany(
//     [
//       {
//         rating: 5,
//         content: "taste delicious!",
//         cake: "ID from your database",
//       },
//       {
//         rating: 3,
//         content: "Took awhile to get here, but the cake is great.",
//         cake: "ID from your database",
//       },
//       {
//         rating: 4,
//         content: "love  the cakes",
//         cake: "ID from your database",
//       },
//     ],
//     function (error, createdReviews) {
//       if (error) {
//         return console.log(error);
//       }
//       console.log("=== Seed Complete ===");
//       console.log(createdReviews);
//     }
//   );
// });
router.get("/", (req, res) => {
  Review.find({})
    .populate("product")
    .exec((error, allReviews) => {
      if (error) {
        console.log(error);
        req.error = error;
        return next();
      }
      const context = { reviews: allReviews };
      return res.render("reviews/index", context);
   });
});

module.exports= router