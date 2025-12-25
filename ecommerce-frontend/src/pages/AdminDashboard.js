import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  const nav = useNavigate();

  useEffect(() => { load(); }, [page]);

  const load = async () => {
    if (!hasMore) return;
    const res = await api.get(`/products?page=${page}&limit=10`);
    const list = Array.isArray(res.data) ? res.data : res.data.products || [];
    setProducts(prev => [...prev, ...list]);
    if (res.data.hasMore === false || list.length === 0) setHasMore(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) setPage(p => p + 1);
    }, { threshold: 1 });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  const remove = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    setProducts(p => p.filter(x => x._id !== id));
  };

  return (
    <div className="container">
      <h2>Admin Products</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td>
                <img
                  src={p.image || "https://via.placeholder.com/60"}
                  alt={p.title}
                  style={{ width: 50, height: 50, objectFit: "contain" }}
                />
              </td>
              <td
                style={{ cursor: "pointer", color: "#2563eb", fontWeight: 500 }}
                onClick={() => nav(`/admin/edit/${p._id}`)}
              >
                {p.title}
              </td>
              <td>₹{p.price}</td>
              <td>
                <button className="btn danger" onClick={() => remove(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {hasMore && <div ref={loaderRef} style={{ height: 40 }} />}
    </div>
  );
}
