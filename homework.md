# Homework — Articles search

Complete the following exercises and submit your work **via pull request**. Each exercise can be one or more commits; one PR per student is enough.

---

## Exercise 1: Debounce function (pure JavaScript)

Implement a **debounce** function in plain JavaScript (no framework).

- **Signature:** `debounce(fn, delayMs)` → returns a new function that, when called, invokes `fn` only after `delayMs` milliseconds have passed since the last call.
- **Requirements:**
  - If the returned function is called again before `delayMs` has elapsed, the previous timeout is cancelled and the timer resets.
  - No use of React or any library for this exercise; only standard JavaScript.
- **Where to put it:** Create a small module (e.g. under `ui/src/utils/` or similar) and add a simple test or usage example so we can see it works.

---

## Exercise 2: useDebounce hook

Implement a **useDebounce** hook in React.

- **Signature:** `useDebounce(value, delayMs)` → returns the debounced value (the value updates only after `delayMs` ms of the input value staying unchanged).
- **Requirements:**
  - Use React only (hooks, no external debounce libraries).
  - You may reuse your debounce function from Exercise 1 inside the hook if it helps.
- **Where to put it:** e.g. `ui/src/hooks/useDebounce.ts` (or `.tsx`). No need to use it in the app yet; we just want the hook implemented and exportable.

---

## Exercise 3: Connect UI and backend

Connect the articles search UI to the real backend API.

- **Current state:** The UI uses mock data and does not call the backend.
- **Goal:** When the user types in the search box, the app should fetch articles from the backend (e.g. `GET /articles?title=...`) and display the results. Loading and empty states should still work.
- **Requirements:**
  - Use the backend URL from env or config (e.g. `VITE_API_URL` or similar), not hardcoded.
  - Replace the mock data flow with real API calls. Keep the UI structure and styling as is.
  - You are free to choose how often to call the API while the user types (e.g. on every keystroke, or after a delay, or on submit). Document your choice and why.

---

## General instructions

1. **Assumptions:** Document any assumptions you make (e.g. backend URL, error handling, behaviour when the request is superseded by a newer one). A short `ASSUMPTIONS.md` or a section in your PR description is fine.
2. **AI use:** If you used AI (ChatGPT, Copilot, etc.) to help with the solution, that’s allowed — but you must be able to **explain and answer questions** about your code in a follow-up (e.g. in person or in a short call). We may ask you to walk through your debounce implementation, your hook, or the fetch/state flow.

Submit your work in a **single pull request** with a clear title and description of what you did for each exercise.
