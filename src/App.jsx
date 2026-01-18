import React, { useState } from 'react'
import UseStateDemo from './hooks/UseStateDemo'
import UseEffectDemo from './hooks/UseEffectDemo'
import UseContextDemo from './hooks/UseContextDemo'
import UseReducerDemo from './hooks/UseReducerDemo'
import UseRefDemo from './hooks/UseRefDemo'
import UseMemoDemo from './hooks/UseMemoDemo'
import UseCallbackDemo from './hooks/UseCallbackDemo'
import UseLayoutEffectDemo from './hooks/UseLayoutEffectDemo'
import UseImperativeHandleDemo from './hooks/UseImperativeHandleDemo'
import UseTransitionDemo from './hooks/UseTransitionDemo'
import { ThemeProvider } from './context/ThemeContext'

/*
Walkthrough - App.jsx

- Top-level component that composes all demo components and wraps them
  with `ThemeProvider` so `useContext` examples can access shared theme.
- Keeps a small local toggle `showExtras` to optionally show the transition demo.
*/

export default function App() {
  // Local UI state to toggle optional demos
  const [showExtras, setShowExtras] = useState(true)

  return (
    <ThemeProvider>
      <div className="container">
        <h1>React Hooks Demo</h1>
        <p>Each section demonstrates a core React hook with comments.</p>

        <section>
          <h2>Essential Hooks</h2>
          {/* Core/commonly used hooks */}
          <UseStateDemo />
          <UseEffectDemo />
          <UseContextDemo />
          <UseReducerDemo />
          <UseRefDemo />
        </section>

        <section>
          <h2>Optimization & Advanced</h2>
          {/* Hooks for optimization and advanced scenarios */}
          <UseMemoDemo />
          <UseCallbackDemo />
          <UseLayoutEffectDemo />
          <UseImperativeHandleDemo />
          {showExtras && <UseTransitionDemo />}
          {/* Button toggles the `useTransition` demo visibility */}
          <button onClick={() => setShowExtras(s => !s)}>
            Toggle Transition Demo
          </button>
        </section>
      </div>
    </ThemeProvider>
  )
}
