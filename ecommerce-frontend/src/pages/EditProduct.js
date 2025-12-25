import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function EditProduct() {
  const { id } = useParams();
  const nav = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: { rate: 0, count: 0 }
  });

  useEffect(() => {
    api.get(`/products/${id}`).then(r => setForm(r.data));
  }, [id]);

  const change = e => {
    const { name, value } = e.target;

    if (name === "rate") {
      setForm(f => ({ ...f, rating: { ...f.rating, rate: Number(value) } }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const save = async () => {
    await api.put(`/products/${id}`, form);
    nav("/admin");
  };

  return (
    <div className="container">
      <h2>Edit Product</h2>

      <label>Title</label>
      <input name="title" value={form.title} onChange={change} />

      <label>Price</label>
      <input name="price" type="number" value={form.price} onChange={change} />

      <label>Category</label>
      <input name="category" value={form.category} onChange={change} />

      <label>Image URL</label>
      <input name="image" value={form.image} onChange={change} />

      <label>Description</label>
      <textarea name="description" value={form.description} onChange={change} />

      <label>Rating</label>
      <input
        name="rate"
        type="number"
        min="0"
        max="5"
        step="0.1"
        value={form.rating?.rate || 0}
        onChange={change}
      />

      <button className="btn primary" onClick={save}>Save Changes</button>
    </div>
  );
}
