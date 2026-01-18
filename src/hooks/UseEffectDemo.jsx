import React, { useState, useEffect } from 'react'

/*
Walkthrough - UseEffectDemo.jsx

- Imports: `useState` for local state and `useEffect` for side-effects.
- `const [time, setTime] = useState(0)`: store elapsed seconds since mount.
- `useEffect(() => { ... }, [])`: runs once after the first render (mount).
  Inside we create an interval to increment `time` every second.
  The returned cleanup function clears the interval when unmounting.
*/

export default function UseEffectDemo() {
  const [time, setTime] = useState(0)

  // Setup a repeating timer as a side-effect. The empty dependency
  // array ensures this effect runs only once after mount.
  useEffect(() => {
    const id = setInterval(() => setTime(t => t + 1), 1000)
    // Return a cleanup function to avoid leaks when the component unmounts.
    return () => clearInterval(id)
  }, [])

  return (
    <div className="card">
      <h3>useEffect</h3>
      {/* Show the current elapsed seconds maintained in state */}
      <p>Seconds mounted: {time}</p>
    </div>
  )
}
