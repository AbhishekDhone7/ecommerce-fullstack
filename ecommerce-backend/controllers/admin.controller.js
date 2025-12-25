import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const createAdminOrSubAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!["admin", "sub-admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
      role,
    });

    res.status(201).json({ message: "Admin created", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
