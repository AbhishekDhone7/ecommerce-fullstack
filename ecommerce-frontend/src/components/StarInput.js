export default function StarInput({ value, onChange }) {
  return (
    <div className="stars">
      {[1,2,3,4,5].map(n => (
        <span
          key={n}
          className={`star ${n <= value ? "filled" : ""}`}
          style={{ cursor: "pointer" }}
          onClick={() => onChange(n)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
