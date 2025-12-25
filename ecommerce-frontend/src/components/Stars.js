export default function Stars({ value }) {
  return (
    <div className="stars">
      {[1,2,3,4,5].map(n => (
        <span key={n} className={`star ${n <= value ? "filled" : ""}`}>★</span>
      ))}
    </div>
  );
}
