import React, { createContext, useState } from 'react'

/*
Walkthrough - ThemeContext.jsx

- Creates a React Context to hold a `theme` string and a `toggle` function.
- `ThemeProvider` wraps parts of the app that should be able to read or
  change the theme via `useContext(ThemeContext)`.
*/

export const ThemeContext = createContext({ theme: 'light', toggle: () => {} })

export function ThemeProvider({ children }) {
  // Manage theme state at a higher level so many components can share it.
  const [theme, setTheme] = useState('light')
  // Toggle between 'light' and 'dark'
  const toggle = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))

  // Provide an object with both the current `theme` and a `toggle` method.
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}
