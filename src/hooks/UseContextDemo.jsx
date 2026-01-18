import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

/*
Walkthrough - UseContextDemo.jsx

- Imports the `ThemeContext` created in `src/context/ThemeContext.jsx`.
- `useContext(ThemeContext)` reads the nearest provider value without
  needing a Consumer wrapper — here we get `{ theme, toggle }`.
- `toggle` is a function exposed by the provider to flip the theme.
*/

export default function UseContextDemo() {
  // Read context value from nearest ThemeProvider
  const { theme, toggle } = useContext(ThemeContext)

  return (
    <div className="card">
      <h3>useContext</h3>
      {/* Display the current theme value coming from context */}
      <p>Current theme: {theme}</p>
      {/* Call the provider's toggle function to change shared state */}
      <button onClick={toggle}>Toggle Theme</button>
    </div>
  )
}
