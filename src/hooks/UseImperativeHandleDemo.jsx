import React, { forwardRef, useImperativeHandle, useRef } from 'react'

/*
Walkthrough - UseImperativeHandleDemo.jsx

- Demonstrates exposing a controlled imperative API from a child component
  using `forwardRef` and `useImperativeHandle`.
- The parent can call methods on the child's ref (e.g., `focus`, `clear`).
*/

const FancyInput = forwardRef(function FancyInput(props, ref) {
  // Local ref to the real input DOM node
  const inputRef = useRef()

  // useImperativeHandle limits/controls what is exposed to the parent when
  // it accesses `ref.current`. This prevents exposing internal details.
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current && inputRef.current.focus(),
    clear: () => (inputRef.current.value = '')
  }))

  // The parent will interact with this input only through the methods above
  return <input ref={inputRef} placeholder="Fancy input" />
})

export default function UseImperativeHandleDemo() {
  // Parent creates a ref and passes it to the child, which exposes methods.
  const ref = useRef()

  return (
    <div className="card">
      <h3>useImperativeHandle</h3>
      <FancyInput ref={ref} />
      {/* Parent calls the methods the child explicitly exposed */}
      <button onClick={() => ref.current && ref.current.focus()}>Focus</button>
      <button onClick={() => ref.current && ref.current.clear()}>Clear</button>
    </div>
  )
}
