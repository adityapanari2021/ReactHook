import React, { useReducer } from 'react'

/*
Walkthrough - UseReducerDemo.jsx

- `reducer(state, action)` implements how state changes for each action type.
- `useReducer(reducer, { count: 0 })` returns `[state, dispatch]`.
  Use `dispatch({ type: 'increment' })` to request state changes.
*/

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      // Return a new state object; do not mutate previous state.
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return { count: 0 }
    default:
      throw new Error('Unknown action')
  }
}

export default function UseReducerDemo() {
  // useReducer is helpful when state logic involves multiple sub-values
  // or complex transitions. It centralizes update logic in the reducer.
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  return (
    <div className="card">
      <h3>useReducer</h3>
      {/* Read the state from the reducer */}
      <p>Count: {state.count}</p>
      {/* Dispatch actions to trigger state transitions in the reducer */}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  )
}
