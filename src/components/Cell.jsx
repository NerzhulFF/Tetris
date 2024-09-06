export function Cell({ x, y, isEmpty, id, color }) {
  return <div className={`cell ${isEmpty ? color : ""}`}></div>;
}
