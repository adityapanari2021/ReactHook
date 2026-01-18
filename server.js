const express = require('express')
const path = require('path')
const app = express()

/*
Walkthrough - server.js

- Minimal Express server used to serve the Vite-built static files from
  the `dist` directory in production.
- It reads `process.env.PORT` with a fallback to 3000 so you can override
  the port when starting the server: `PORT=4000 node server.js`.
*/

const port = process.env.PORT || 3000

// Serve static assets from the build output directory
app.use(express.static(path.join(__dirname, 'dist')))

// For single-page apps, return the application's `index.html` for any route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log('Server listening on', port)
})
