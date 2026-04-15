import React, { useState, Profiler } from "react";

// Child component
function Child({ name }) {
  console.log("Child Rendered");
  return <h2>Hello, {name}</h2>;
}

// Profiler callback function
function onRenderCallback(
  id,
  phase,
  actualDuration,
  baseDuration
) {
  console.log("Profiler Data:");
  console.log("Component:", id);
  console.log("Phase:", phase);
  console.log("Actual Duration:", actualDuration);
  console.log("Base Duration:", baseDuration);
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>React Profiler Demo</h1>

      {/* Profiler wrapper */}
      <Profiler id="ChildComponent" onRender={onRenderCallback}>
        <Child name="Anjali" />
      </Profiler>

      {/* Button to trigger re-render */}
      <button onClick={() => setCount(count + 1)}>
        Count {count}
      </button>
    </div>
  );
}

export default App;
