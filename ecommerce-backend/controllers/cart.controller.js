import Cart from "../models/Cart.js";

export const add = async (req, res) => {
  const { product, qty } = req.body;

  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) cart = await Cart.create({ user: req.user.id, items: [] });

  const existing = cart.items.find(i => i.product.toString() === product);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.items.push({ product, qty });
  }

  await cart.save();
  res.json(cart);
};

export const get = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
  res.json(cart || { items: [] });
};
