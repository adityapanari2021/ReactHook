import React, { useMemo, useState } from 'react'

/*
Walkthrough - UseMemoDemo.jsx

- Demonstrates memoizing expensive calculations so they only rerun when
  inputs change.
- `useMemo(factory, [deps])` returns a memoized value. The factory runs
  only when a dependency changes.
*/

function expensiveComputation(n) {
  // Simulate a heavy CPU-bound task. In real apps this might be a
  // CPU-heavy transform or a synchronous parse/format operation.
  let s = 0
  for (let i = 0; i < 10000000; i++) s += i % (n + 1)
  return s
}

export default function UseMemoDemo() {
  const [num, setNum] = useState(10)

  // Memoize the expensive computation; it will only re-run when `num` changes.
  const computed = useMemo(() => expensiveComputation(num), [num])

  return (
    <div className="card">
      <h3>useMemo</h3>
      {/* Show input and memoized result */}
      <p>Num: {num}</p>
      <p>Computed: {computed}</p>
      <button onClick={() => setNum(n => n + 1)}>Increase</button>
    </div>
  )
}
