import React, { useState, useTransition } from 'react'

/*
Walkthrough - UseTransitionDemo.jsx

- Demonstrates `useTransition`, which lets you mark state updates as
  non-urgent so React can keep the UI responsive for urgent updates.
- `useTransition` returns `[isPending, startTransition]`.
*/

export default function UseTransitionDemo() {
  const [isPending, startTransition] = useTransition()
  const [text, setText] = useState('')
  const [items, setItems] = useState([])

  const handleChange = e => {
    const v = e.target.value
    // Immediate update for the input value so typing feels responsive
    setText(v)
    // Mark the expensive update (creating a large list) as low priority
    startTransition(() => {
      setItems(Array.from({ length: 2000 }, (_, i) => v + ' ' + i))
    })
  }

  return (
    <div className="card">
      <h3>useTransition</h3>
      {/* Input updates immediately; list update is deferred */}
      <input value={text} onChange={handleChange} placeholder="Type..." />
      {/* `isPending` is true while the transition is in progress */}
      <p>{isPending ? 'Updating...' : 'Idle'}</p>
      <div className="list">
        {items.slice(0, 20).map((it, i) => (
          <div key={i}>{it}</div>
        ))}
      </div>
    </div>
  )
}
