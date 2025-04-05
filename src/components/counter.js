import { useState } from "react";

function Counter() {
  // useState hook to manage the counter state
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}

export default Counter;
