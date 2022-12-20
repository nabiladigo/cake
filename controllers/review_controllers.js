// const { Product, Review } = require("../models");

// Review.deleteMany({}, function (error, deletedReviews) {
//   if (error) {
//     return console.log(error);
//   }
//   Review.insertMany(
//     [
//       {
//         rating: 5,
//         content: "Fast Delivery!",
//         product: "ID from your database",
//       },
//       {
//         rating: 3,
//         content: "Took awhile to get here, but the product is great.",
//         product: "ID from your database",
//       },
//       {
//         rating: 4,
//         content: "love the style of the products",
//         product: "ID from your database",
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