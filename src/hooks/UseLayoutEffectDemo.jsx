import React, { useLayoutEffect, useRef, useState } from 'react'

/*
Walkthrough - UseLayoutEffectDemo.jsx

- `useLayoutEffect` runs synchronously after DOM mutations but before the
  browser paints. Use it when you need to measure layout and apply
  changes immediately to avoid flicker.
*/

export default function UseLayoutEffectDemo() {
  // Ref to the DOM element we want to measure
  const ref = useRef(null)
  const [height, setHeight] = useState(0)

  // Measure the element size synchronously after it's in the DOM.
  useLayoutEffect(() => {
    if (ref.current) setHeight(ref.current.getBoundingClientRect().height)
  }, [])

  return (
    <div className="card">
      <h3>useLayoutEffect</h3>
      {/* Element we measure; ref gives access to the DOM node */}
      <div ref={ref} style={{ padding: 20, background: '#f5f5f5' }}>
        This box's height was measured with useLayoutEffect
      </div>
      <p>Measured height: {height}px</p>
    </div>
  )
}
