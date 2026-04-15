# 1) React Performance Profiling 

React Performance Profiling is the process of **measuring, analyzing, and optimizing the rendering behavior** of a React application.

It helps developers understand:
- Which components are rendering
- Why they are rendering
- How much time rendering takes
- Which parts of the UI are causing slow performance

Profiling is important for building **fast, scalable, and user-friendly applications**, especially in large projects.

---

##  Performance Profiling -
Performance profiling means **tracking the performance of components during rendering and updates**.

It helps answer questions like:
- Which component is slow?
- How many times is it rendering?
- Is it re-rendering unnecessarily?
- How much time does React take to commit updates to the DOM?

This process helps in **finding bottlenecks** and improving application speed.

---


## React Rendering Phases
To understand profiling, first understand React’s rendering lifecycle.

### 1. Render Phase
React calculates what changes are needed in the UI.

This includes:
- Calling component functions
- Running JSX
- Comparing virtual DOM

### 2. Commit Phase
React applies changes to the real DOM.

The commit phase affects visible UI performance.

---

Example:
A component taking **20ms** is slower than one taking **2ms**.

### Commit Duration
Time taken to update the real DOM.

This directly affects UI responsiveness.

### Render Count
Number of times a component re-renders.

Too many renders indicate performance issues.

### Flame Graph
A visual graph showing component render cost.

Wider bars indicate more time consumed.

---

## Common Causes of Unnecessary Re-rendering

### Parent Re-render
When a parent component updates, child components may also re-render.

### New Function References
Example:
```jsx
<button onClick={() => handleClick()} />
This creates a new function on every render.

# 2) React.memo – Deep Behavior 

## Introduction
`React.memo` is a **higher-order component (HOC)** used to optimize functional components by **preventing unnecessary re-renders**.

It tells React to **reuse the previous rendered result** if the component’s **props have not changed**.

This improves performance in applications where components receive the same props multiple times.

---

## Basic Syntax
```jsx
const MyComponent = React.memo(function MyComponent(props) {
  return <div>{props.name}</div>;
});


How React.memo Works Internally -

Normally, when a parent component re-renders, all child components also re-render.

With React.memo, React performs a shallow comparison of previous props and new props.

If props are the same → React skips re-render
If props changed → React re-renders the component

This process is called memoization of rendered output.

Default Comparison Behavior

By default, React.memo uses shallow comparison.

This means React checks whether prop references are equal using Object.is().

Example:

prevProps.name === nextProps.name

For primitive values:

string
number
boolean

comparison works very well.

Example:

<User name="Anjali" />

If name remains "Anjali", re-render is skipped.

Problem with Objects and Functions

For objects, arrays, and functions, React.memo checks reference equality, not deep equality.

Example:

<User style={{ color: "red" }} />

Even if the content is the same, a new object is created on every render.

So React sees:

{} !== {}

and re-renders the component.

Same for functions:

<User onClick={() => handleClick()} />

A new function reference is created every render.

This causes unnecessary re-renders.

That’s why useMemo() and useCallback() are often used together with React.memo.

Example of Behavior
import React, { useState } from "react";

const Child = React.memo(({ name }) => {
  console.log("Child Rendered");
  return <h1>{name}</h1>;
});

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Child name="Anjali" />
      <button onClick={() => setCount(count + 1)}>
        Count {count}
      </button>
    </>
  );
}
Output Behavior

When button is clicked:

Parent App re-renders
Child does not re-render
Because name prop is unchanged

This is the main optimization.

Custom Comparison Function

React.memo allows custom comparison logic.

Syntax:

React.memo(Component, areEqual)

Example:

const Child = React.memo(
  ({ user }) => {
    return <h1>{user.name}</h1>;
  },
  (prevProps, nextProps) => {
    return prevProps.user.id === nextProps.user.id;
  }
);

If comparison returns true:

Skip re-render

If returns false:

Re-render component

This is useful for complex prop structures.

Deep Theory of Reconciliation Impact

React.memo works during React’s reconciliation phase.

Normally React compares virtual DOM trees.

With memo:

React first checks prop equality
If same, it bails out early
Skips component execution
Skips JSX generation
Skips child reconciliation

This saves CPU time.


# 3) Virtualized List Rendering 

Virtualized List Rendering is a **React performance optimization technique** used for handling **large lists efficiently**.

Instead of rendering all items, it renders **only the visible items in the viewport**.

This technique is also called **windowing**.

---

##  Importantance -
Rendering thousands of items at once can cause:
- slow loading
- high memory usage
- laggy scrolling
- poor UI performance

Example:
```jsx
items.map((item) => <Row key={item.id} />)

Spacer Height -

Scrollbar height is maintained using:

totalHeight = totalItems × itemHeight

This gives smooth scrolling even when only a few rows are rendered.

Common Library -

Most used library:

import { FixedSizeList as List } from "react-window";


# 4) Bundle Splitting using React.lazy 

Bundle Splitting is a **React performance optimization technique** used to split the application code into smaller JavaScript bundles.

Instead of loading the entire app at once, React loads only the required component **when it is needed**.

This improves **initial loading speed** and overall performance.

---

##  Importantance -
In large applications, loading all components in one file increases bundle size.

This can cause:
- slow page load
- higher initial download size
- delayed UI rendering

Bundle splitting solves this by loading components on demand.

---

## React.lazy -
`React.lazy()` is used for **lazy loading components dynamically**.

Syntax:
```jsx
const Dashboard = React.lazy(() => import("./Dashboard"));

Here, the Dashboard component is loaded only when it is rendered.

Suspense

Lazy-loaded components must be wrapped inside Suspense.

Example:

import React, { Suspense } from "react";

const Dashboard = React.lazy(() => import("./Dashboard"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Dashboard />
    </Suspense>
  );
}
fallback → UI shown while component is loading
improves user experience
Working Theory

When the app starts:

main bundle loads first
lazy component code is excluded initially

When component is required:

separate bundle is downloaded
component is rendered

This is called code splitting / dynamic import.

Benefits -
faster initial load
smaller main bundle
better performance
optimized large applications
improved user experience


# 4) Suspense Fallback Strategies – Important Points

`Suspense` in React is used to handle **lazy-loaded components and asynchronous UI loading states**.

The `fallback` prop defines what should be displayed **while the component or data is still loading**.

It improves user experience by showing a temporary UI instead of a blank screen.

---

## Basic Syntax -
```jsx
<Suspense fallback={<p>Loading...</p>}>
  <Dashboard />
</Suspense>

Here:

fallback → temporary loading UI
Dashboard → lazy-loaded component

Common Fallback Strategies -
1. Text Loader

Simple loading message.

<Suspense fallback={<p>Loading...</p>}>
  <Dashboard />
</Suspense>

Best for basic applications.

2. Spinner Loader

Shows a loading spinner.

<Suspense fallback={<div className="spinner"></div>}>
  <Dashboard />
</Suspense>

Gives better visual feedback.

3. Skeleton Loader

Shows placeholder layout similar to final UI.

<Suspense fallback={<SkeletonCard />}>
  <Dashboard />
</Suspense>

Best for professional apps because users can predict the layout.

4. Page-Level Fallback

Used for route-based lazy loading.

<Suspense fallback={<FullPageLoader />}>
  <Routes />
</Suspense>

Covers the full page while route components load.
