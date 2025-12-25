import Review from "../models/Review.js";

export const add = async (req, res) => {
  const review = await Review.create({ ...req.body, user: req.user.id });
  res.json(review);
};

export const get = async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId }).populate("user");
  res.json(reviews);
};
