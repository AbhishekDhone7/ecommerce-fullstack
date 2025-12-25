import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  console.log(req.body)
  const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
  res.json(user);
};
