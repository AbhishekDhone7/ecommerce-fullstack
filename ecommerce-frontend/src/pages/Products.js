import { useEffect, useRef, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    loadProducts();
  }, [page]);

  const loadProducts = async () => {
    if (!hasMore) return;

    const res = await api.get(`/products?page=${page}&limit=50`);
    console.log(res.data)
    const newProducts = res.data.products || res.data;

    setProducts(prev => [...prev, ...newProducts]);

    if (res.data.hasMore === false || newProducts.length === 0) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(p => p + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <div className="container grid">
      {products.map(p => (
        <div className="product-card" key={p._id}>
          <img
            src={p.image || "https://via.placeholder.com/300x180?text=No+Image"}
            alt={p.title}
            style={{ display: "block", width: "180px", height: "180px", borderRadius: "6px", margin: "auto" }}
          />
          <h4 title={p.title}>{p.title}</h4>
          <p>₹{p.price}</p>
          <Link to={`/products/${p._id}`}>View</Link>
        </div>
      ))}

      {hasMore && (
        <div ref={loaderRef} style={{ height: 40, gridColumn: "1 / -1" }} />
      )}
    </div>
  );
}


