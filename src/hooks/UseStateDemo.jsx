import React, { useState } from 'react'

/*
Walkthrough - UseStateDemo.jsx

- Line 1: import React and the `useState` hook from React.
- Line 5: `const [count, setCount] = useState(0)` declares a state variable `count`
  initialized to `0` and `setCount` to update it.
- In the JSX below we read `count` and call `setCount` to update state.
  Calling `setCount` triggers a re-render with the new value.
*/

export default function UseStateDemo() {
  // Declare local state `count` with initial value 0.
  // `useState` returns [value, updater]. The updater can accept
  // a new value or a function that receives the previous value.
  const [count, setCount] = useState(0)

  return (
    <div className="card">
      <h3>useState</h3>
      {/* Read the state variable directly in JSX */}
      <p>Count: {count}</p>
      {/* Increment uses the functional updater to avoid stale closures */}
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      {/* Reset sets state back to a fixed value */}
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}
