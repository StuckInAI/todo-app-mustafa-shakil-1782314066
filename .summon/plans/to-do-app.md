---
status: building
title: To-Do App
---

1. **Set up global styles** — In `/app/src/styles/global.css`, ensure the file starts with `@import "tailwindcss";` and includes a clean base background and font style for the whole app.

2. **Create a shared types file** — In `/app/src/types/todo.ts`, define a `Todo` type with fields: `id` (string), `text` (string), `completed` (boolean), and `createdAt` (Date).

3. **Create a custom hook for to-do logic** — In `/app/src/hooks/useTodos.ts`, implement all state and logic:
   - Store the list of todos in local state, initialized from `localStorage` so tasks persist on refresh.
   - Persist any changes back to `localStorage` on every update.
   - Expose functions: `addTodo(text)`, `toggleTodo(id)`, `deleteTodo(id)`, and `clearCompleted()`.
   - Expose a derived value `filter` (all / active / completed) and a `setFilter` function.
   - Expose the filtered list of todos based on the current filter.

4. **Create a `TodoInput` component** — In `/app/src/components/TodoInput.tsx`, render a full-width text input with a submit button (or Enter key support). Displays a placeholder like "What needs to be done?". Calls `addTodo` on submit and clears the field afterwards. Disables submit if the input is empty or only whitespace.

5. **Create a `TodoItem` component** — In `/app/src/components/TodoItem.tsx`, render a single to-do row with:
   - A checkbox that toggles completion (completed items show strikethrough text and a muted color).
   - The to-do text.
   - A delete button (trash icon using a Unicode character or simple "✕") visible on hover.

6. **Create a `TodoFilter` component** — In `/app/src/components/TodoFilter.tsx`, render three filter buttons: "All", "Active", "Completed". Highlight the currently active filter. Clicking each calls `setFilter`. Also shows a "Clear completed" button that only appears when there is at least one completed task.

7. **Create a `TodoList` component** — In `/app/src/components/TodoList.tsx`, render the list of filtered todos using `TodoItem`. If the filtered list is empty, show a friendly empty-state message (e.g. "Nothing here yet!" or "All done! 🎉" depending on filter).

8. **Create the main page** — In `/app/src/pages/TodoPage.tsx`, compose the full to-do app layout:
   - Centered card layout with a heading like "My To-Do List".
   - Uses the `useTodos` hook and passes the appropriate props to `TodoInput`, `TodoFilter`, and `TodoList`.
   - Shows a small summary below the list (e.g. "3 tasks remaining").

9. **Wire up the app entry point** — In `/app/src/App.tsx`, render `TodoPage` as the root component. Ensure `/app/src/main.tsx` imports `@/styles/global.css` and renders `App`.
