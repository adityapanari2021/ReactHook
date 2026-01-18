import React, { useRef } from 'react'

/*
Walkthrough - UseRefDemo.jsx

- `useRef(initial)` returns an object `{ current }` that persists across renders.
- Reassigning `.current` does not trigger re-renders — useful for storing
  mutable values or DOM nodes.
*/

export default function UseRefDemo() {
  // Create a ref to attach to an input DOM node
  const inputRef = useRef(null)

  // Imperative function that focuses the input if available
  const focus = () => {
    if (inputRef.current) inputRef.current.focus()
  }

  return (
    <div className="card">
      <h3>useRef</h3>
      {/* Attach the ref to the input element to get DOM access */}
      <input ref={inputRef} placeholder="Click the button to focus" />
      <button onClick={focus}>Focus Input</button>
    </div>
  )
}
