import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Cart() {
  const [cart, setCart] = useState(null);

  const refresh = async () => {
    const res = await api.get("/cart");
    setCart(res.data);
  };

  useEffect(() => { refresh(); }, []);

  const changeQty = async (id, delta) => {
    await api.post("/cart", { product: id, qty: delta });
    refresh();
  };

  const removeItem = async (id) => {
    await api.post("/cart", { product: id, qty: -999 });
    refresh();
  };

  if (!cart || cart.items.length === 0) {
    return <div className="container"><div className="card">Your cart is empty</div></div>;
  }

  const total = cart.items.reduce((s, i) => s + i.qty * i.product.price, 0);

  return (
    <div className="container">
      <div className="cart-wrapper">
        <div className="cart-header">Shopping Cart</div>

        {cart.items.map(i => (
          <div key={i.product._id} className="cart-row">
            <div className="cart-thumb">
              <img src={i.product.image} alt={i.product.title} />
            </div>

            <div className="cart-info">
              <div className="cart-title">{i.product.title}</div>
              <div className="cart-price">₹{i.product.price}</div>
            </div>

            <div className="cart-qty">
              <button className="secondary" onClick={() => changeQty(i.product._id, -1)}>-</button>
              <span>{i.qty}</span>
              <button onClick={() => changeQty(i.product._id, 1)}>+</button>
            </div>

            <div className="cart-subtotal">₹{i.qty * i.product.price}</div>

            <button className="cart-remove" onClick={() => removeItem(i.product._id)}>×</button>
          </div>
        ))}

        <div className="cart-footer">
          <span className="cart-total">Total: ₹{total}</span>
          <button className="btn primary">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}
