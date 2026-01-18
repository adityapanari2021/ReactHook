import React, { useState, useCallback } from 'react'

/*
Walkthrough - UseCallbackDemo.jsx

- Shows how `useCallback` memoizes function references so they remain stable
  across renders unless dependencies change.
- A stable function prop can prevent unnecessary re-renders in memoized children.
*/

function Child({ onAction }) {
  // Simple child that receives a callback prop and calls it on click.
  return <button onClick={onAction}>Child action</button>
}

export default function UseCallbackDemo() {
  const [count, setCount] = useState(0)

  // Memoize the handler so its identity is stable across renders.
  // The empty dependency array means this function is created once.
  const handleAction = useCallback(() => {
    // Use functional updater to ensure we always have the latest count.
    setCount(c => c + 1)
  }, [])

  return (
    <div className="card">
      <h3>useCallback</h3>
      {/* Display current state updated by the child action */}
      <p>Count: {count}</p>
      <Child onAction={handleAction} />
    </div>
  )
}
