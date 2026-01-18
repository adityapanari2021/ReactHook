# React Hooks Demo

Simple Node + React project demonstrating common React hooks with explanatory comments.

Getting started (using yarn):

```bash
cd ReactProject
yarn install
yarn dev        # runs Vite dev server

# To build and serve with Node/Express:
yarn build
yarn start      # serves dist via server.js on port 3000
```

Files of interest:
- `src/` — React source
- `src/hooks/` — one demo component per hook (useState, useEffect, ...)
- `server.js` — simple Express server to serve the `dist` folder

Hooks — Use cases & impact
-------------------------

Below are concise descriptions of when to use each hook included in this
project, and the practical impact they have on component behavior and
performance.

- `useState` — Use case: local component state (form inputs, toggles,
	simple counters). Impact: triggers re-renders when updated; keep state
	minimal and derived values computed in render to avoid unnecessary
	state bloat.

- `useEffect` — Use case: side effects (network requests, timers,
	subscriptions). Impact: runs after render; provide cleanup to avoid
	leaks. Dependencies control when the effect runs — incorrect arrays
	lead to stale values or extra runs.

- `useContext` — Use case: share read/write values across component trees
	(theme, auth, localization). Impact: reading context causes the
	consumer to re-render when the provider value changes; keep provider
	value stable (memoize if needed) to prevent cascading updates.

- `useReducer` — Use case: complex state transitions or when updates
	depend on previous state (forms, state machines). Impact: centralizes
	update logic and improves testability; can avoid prop-drilling by
	pairing with context.

- `useRef` — Use case: access DOM nodes imperatively or store mutable
	values that do not require re-rendering (timeouts, previous values).
	Impact: changing `.current` does not trigger renders; use for
	bookkeeping or DOM access only.

- `useMemo` — Use case: expensive synchronous computations that should
	not re-run on every render (derived values). Impact: avoids wasted CPU
	work but adds memory for cached value; do not overuse for trivial
	computations.

- `useCallback` — Use case: keep stable function identities across
	renders for dependents (memoized children, effect deps). Impact:
	reduces unnecessary child renders when used correctly; avoid
	premature optimization — only use when you measure re-render issues.

- `useLayoutEffect` — Use case: read layout or synchronously apply DOM
	changes before the browser paints to avoid visual glitches.
	Impact: blocks paint and can hurt perceived performance; prefer
	`useEffect` unless you must measure or mutate layout immediately.

- `useImperativeHandle` — Use case: expose a limited imperative API from
	a child component to its parent (focus, reset). Impact: keeps child
	internals encapsulated while providing controlled imperative actions.

- `useTransition` — Use case: mark large/low-priority updates (e.g.
	rendering big lists) so urgent updates (typing, input) stay responsive.
	Impact: improves perceived responsiveness by allowing React to
	prioritize updates; use for non-critical UI updates.

If you'd like, I can expand any of the above with code examples, or add
the content as a separate `HOOKS.md` file for easier browsing.
