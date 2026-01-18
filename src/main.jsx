import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

/*
Walkthrough - main.jsx

- Entry point for the React application. Mounts the top-level `App`
	component into the DOM element with id `root` using the React 18 API.
*/

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
