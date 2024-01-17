# Questions and Answers

- **What is the difference between Component and PureComponent? Give an example where it might break my app.**: The main difference is that PureComponent has a built-in `shouldComponentUpdate` method, which will be automatically prevent from re-render if there is no props/state change. For Component we should do that manually by implementing that method. However, `shouldComponentUpdate` using shallow comparison mechanism, which means it won't be effective when dealing with complex objects and won't detect any change. In this situation, to avoid mistakes it would be better to implement own deep comparison mechanism.

- **Context + ShouldComponentUpdate might be dangerous. Can think of why is that**: Imagine we have a context, and some of our components rely on that context. If one of the parent components using `shouldComponentUpdate` method, the other components may not see the upcoming changes, because of the blocker method. I don't have much experience with class components + context API, but I know that there won't be a problem with new hooks. 

- **Describe 3 ways to pass information from a component to its PARENT**: 1) Keep and pass information using ContextAPI 2) Use state manager (Redux, Mobx, Zustand, Recoil...) 3) Let child component hold a prop with callback and then invoke some method in parent component, which will fire the callback and get the information.

- **Give 2 ways to prevent components from re-rendering.**: 1) Using react memo, which will skip re-rendering if props are unchanged. Unlike `PureComponent` with its `shouldComponentUpdate`, we can pass a second argument to memo, which is a comparison function, where we can describe our comparison mechanism, and don't worry about nested objects 2) Avoid reference recreations by using useMemo/useCallback. useMemo will cache the function return, while useCallback will cache the function itself.   

- **What is a fragment and why do we need it? Give an example where it might break my app**: We can't define more than one parent elements in our component, so if we want to group them together we can use fragments `<><Group1/><Group2/></>`. React Fragment has no affect to DOM. Fragment can break an app when we dealing with them dynamically and applying some DOM manipulations like "removeChild", or maybe it can break some styles when applying styles dynamically.


- **Give 3 examples of the HOC pattern.**: 
1) React.memo 
2) React.Suspense(withSuspense), React.lazy, 
3) React.forwardRef

- **what's the difference in handling exceptions in promises, callbacks and async...await.**: For callback there is no automated mechanism for handling and propagating errors, we need to do it manually, while in async...await and in promises there will be automatically delivered in the nearest 'catch' block, so it's better to use async...await.

- **How many arguments does setState take and why is it async.**: setState has 2 arguments - the next state and the optional callback function, setState is async to provide code update right after the component re-renders, it can't be sync because rice condition can happen and some components could not be able to update state while the others are in progress.

- **List the steps needed to migrate a Class to Function Component.**: 
1) Create a migration plan and setup version control, estimate project (critical parts which may be broken after dependency updates)
2) Understand principles of new React with functional components, (hooks, syntax, working mechanism, etc), 
3) Update dependencies, if something is broken or deprecated, fix that first
4) Start updating (change syntax, methods, states to new version) from non-complicated, small components, by pushing it from small branches and test everything,
5) Change documentation if needed
6) Analyze and test everything, to be sure it is working fine

- **List a few ways styles can be used with components.**: 
1) inline-CSS
2) Global CSS (one file) or CSS modules (separated CSS files)
3) CSS-in-JS with libraries
4) Styled Components
5) Sass, less

- **How to render an HTML string coming from the server.**: dangerouslySetInnerHTML, but there may be third-party safer alternatives

