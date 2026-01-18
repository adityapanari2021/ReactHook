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
import EcommerceProductListingDemo from './hooks/EcommerceProductListingDemo'
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
  const [currentView, setCurrentView] = useState('demos') // 'demos' or 'ecommerce'

  return (
    <ThemeProvider>
      <div className="container">
        {/* Navigation Bar */}
        <nav style={{
          backgroundColor: '#333',
          padding: '0',
          marginBottom: '20px',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'flex',
            gap: '0'
          }}>
            <button
              onClick={() => setCurrentView('demos')}
              style={{
                flex: 1,
                padding: '15px 20px',
                backgroundColor: currentView === 'demos' ? '#007bff' : '#444',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: currentView === 'demos' ? 'bold' : 'normal',
                transition: 'background-color 0.3s'
              }}
            >
              📚 All Hook Demos
            </button>
            <button
              onClick={() => setCurrentView('ecommerce')}
              style={{
                flex: 1,
                padding: '15px 20px',
                backgroundColor: currentView === 'ecommerce' ? '#28a745' : '#444',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: currentView === 'ecommerce' ? 'bold' : 'normal',
                transition: 'background-color 0.3s'
              }}
            >
              🛍️ E-commerce Demo
            </button>
          </div>
        </nav>

        {/* All Hook Demos View */}
        {currentView === 'demos' && (
          <>
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
          </>
        )}

        {/* E-commerce Component View */}
        {currentView === 'ecommerce' && (
          <>
            <h1>E-commerce Product Listing</h1>
            <p>A real-world example combining multiple React hooks for an e-commerce shopping experience.</p>
            <EcommerceProductListingDemo />
          </>
        )}
      </div>
    </ThemeProvider>
  )
}
