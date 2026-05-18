---
platform: "hashnode"
mode: "api-delisted-draft-or-manual-copy"
post_mode: "full-mirror"
title: "Alphabetize your code."
canonical_url: "https://davidmieloch.com/blog/alphabetize-your-code"
tracked_url: "https://davidmieloch.com/blog/alphabetize-your-code?utm_source=hashnode&utm_medium=syndication&utm_campaign=content_distribution&utm_content=alphabetize-your-code"
source_slug: "alphabetize-your-code"
generated_at: "2026-05-18T21:41:27.837Z"
canonical_support: "supported"
approval_required: true
public_publish_allowed: false
---

# Alphabetize your code.

## Posting guidance

Developer-facing draft with original article URL preserved.

- Do not publish without David approval.
- Preserve canonical URL: https://davidmieloch.com/blog/alphabetize-your-code
- Record the final platform URL back in content/distribution/platform-ledger.json.

## Copy

### Why?

As humans, we thrive on structure and order, and labeling things is a great way to help our brains process information more effectively. Have you ever noticed how you can quickly identify the alphabetical ordering of items within the first three elements?

This is because the alphabetical order is a familiar and predictable pattern that we can easily scan. In coding, it’s essential to have a clean and organized project, and applying alphabetical ordering to different entities can make a big difference in reducing the amount of time spent on organizing and reordering as well as scanning visually to find a particular property.

Read on to learn more about the power of alphabetical ordering in coding.

![medium 01](/blog/alphabetize-your-code/images/medium-01.png)

### What are some things I alphabetize?

### Style properties - CSS in JS



```
const styles = {
  backgroundColor: '#f2f2f2',
  border: '1px solid #333',
  borderRadius: '4px',
  color: '#333',
  fontSize: '16px',
  padding: '10px',
  textAlign: 'center'
};
```



### Destructured component props



```
import React from 'react';

function MyComponent({ age, name, occupation }) {
  return (

      Name: {name}
      Age: {age}
      Occupation: {occupation}

  );
}

export default MyComponent;
```



### React components



```
import React from "react";
import User from "./User";

const App: React.FC = () => {
  return (



  );
};
export default App;
```



### Object properties in General



```
const person = {
  age: 30,
  name: 'John Doe',
  occupation: 'Developer'
};

const { age, name, occupation } = person;
```



### Module import groups



```
import { add, subtract } from './math-functions';
import { formatDate } from './date-functions';
import { getData, postData } from './api-functions';
```



### Single line arrow function groups



```
const add = (a, b) => a + b;
const divide = (a, b) => a / b;
const multiply = (a, b) => a * b;
const subtract = (a, b) => a - b;
```



### Redux action types and reducers



```
const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';
const EDIT_TODO = 'EDIT_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

export { ADD_TODO, DELETE_TODO, EDIT_TODO, TOGGLE_TODO };
```



```
import { combineReducers } from 'redux';

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.todo];
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id);
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

export default combineReducers({ todos, visibilityFilter });
```



### Typescript interfaces and definitions



```
interface User {
  age: number;
  email: string;
  name: string;
  role: string;
  status: boolean;
}
```



### Things you shouldn’t alphabetize

Arguments in a function must go in a specific order and can’t be rearranged.



```
const calculateTotal = (price, quantity, discount) => {
  return price * quantity * (1 - discount);
};

console.log(calculateTotal(100, 2, 0.1)); // Output: 180
```



Some CSS is based on doubling up properties to override another within the same class name. Reordering would break that pattern.



```
.element {
  background-color: blue;
  background-color: green;
}
```



You can’t always alphabetize every import, some imports need to come first or the app will crash, but there are groups of imports that can be alphabetized.



```
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

const Root = () => (



);

export default Root;
```



Const functions may not work in alphabetical order, function() functions will work in any order.



```
const add = (a, b) => a + b;
const example = (a, b) => subtract(a, b); // Output: ReferenceError: subtract is not defined
const subtract = (a, b) => a - b;
```



### Great tools to help you alphabetize

Sort manually using vscode.

[Alphabetical Sorter - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ue.alphabetical-sorter)

Sort keys automatically on save using eslint!

- [eslint-plugin-sort-keys](https://www.npmjs.com/package/eslint-plugin-sort-keys)
- [eslint-plugin-sort-keys-fix](https://www.npmjs.com/package/eslint-plugin-sort-keys-fix)
- [eslint-plugin-typescript-sort-keys](https://www.npmjs.com/package/eslint-plugin-typescript-sort-keys)

### Alphabetical Ordering Rocks

In conclusion, alphabetical ordering is a simple yet effective way to keep your projects organized and make it easier for you to locate and process information. Next time you are looking for a solution to organize named items in your projects, remember to turn to alphabetical ordering as your go-to method.

Implementing this technique can greatly improve the overall structure and organization of your project, saving you time and energy in the long run. I hope this blog post has been helpful in showing you the benefits of using alphabetical ordering and how it can transform the way you approach organization in your projects.

![medium 02](/blog/alphabetize-your-code/images/medium-02.png)

---

Read the canonical version and related series on davidmieloch.com.

Read the canonical version: https://davidmieloch.com/blog/alphabetize-your-code?utm_source=hashnode&utm_medium=syndication&utm_campaign=content_distribution&utm_content=alphabetize-your-code
