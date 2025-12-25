import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Stars from "../components/Stars";
import StarInput from "../components/StarInput";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    api.get(`/products/${id}`).then(r => setProduct(r.data));
    api.get(`/reviews/${id}`).then(r => setReviews(r.data));
  }, [id]);

  const addToCart = async () => {
    await api.post("/cart", { product: id, qty: 1 });
    alert("Added to cart");
  };

  const submitReview = async () => {
    const r = await api.post("/reviews", { product: id, rating, comment });
    setReviews(prev => [...prev, r.data]);
    setComment("");
  };

  if (!product) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="card">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="card-body">
          <h2>{product.title}</h2>
          <Stars value={Math.round(product.rating?.rate || 0)} />
          <p>{product.description}</p>
          <div className="card-price">₹{product.price}</div>
          <button className="btn primary" onClick={addToCart}>Add to Cart</button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">Reviews</div>
        <div className="card-body">
          {reviews.map(r => (
            <div key={r._id} className="review">
              <div className="review-user">{r.user?.name}</div>
              <Stars value={r.rating} />
              <div className="review-comment">{r.comment}</div>
            </div>
          ))}

          <div style={{ marginTop: "16px" }}>
            <StarInput value={rating} onChange={setRating} />
            <textarea
              placeholder="Write a comment..."
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
            <button className="btn primary" onClick={submitReview}>Submit Review</button>
          </div>
        </div>
      </div>
    </div>
  );
}
