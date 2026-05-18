---
title: "The Beauty of ES6's Object Destructuring Assignment"
description: "Benefits Key name can’t change, predictability Keys can be in any order, and can be alphabetized Inputs and outputs become incredibly clear Object destructuring is an incredibly po"
publishedAt: "2023-02-02"
status: "published"
sourcePlatform: "medium"
sourceUrl: "https://medium.com/@davidmieloch/the-beauty-of-es6s-object-destructuring-assignment-3d547fcf5d8b"
canonicalUrl: "https://davidmieloch.com/blog/the-beauty-of-es6s-object-destructuring-assignment"
series: "Legacy Engineering Notes"
tags: ["javascript", "es6"]
---

![medium 01](/blog/the-beauty-of-es6s-object-destructuring-assignment/images/medium-01.png)

### Benefits

- Key name can’t change, predictability
- Keys can be in any order, and can be alphabetized
- Inputs and outputs become incredibly clear

Object destructuring is an incredibly powerful tool that allows developers to quickly and easily access data stored in complex object structures. By using object destructuring, developers can assign object properties to variables and pull out only the information they need. With object destructuring, inputs and outputs become incredibly clear, and the key name can’t change, providing predictability. Additionally, keys can be in any order and can be alphabetized to make the code more readable.

### Disadvantages

- The name space can become more polluted

However, there are some disadvantages to object destructuring. The name space can become more polluted, as developers are encouraged to use shorter and more concise variable names in order to make the code more readable. Additionally, developers must be careful when using nested destructuring, as it can be easy to lose track of the data when dealing with complex objects. Finally, it is important to note that any properties that are not destructured will remain in the object, leaving it up to the developer to make sure all data is accounted for.

![medium 02](/blog/the-beauty-of-es6s-object-destructuring-assignment/images/medium-02.png)

### Patterns

- Destructured object with properties

```
const user = {
  name: 'John',
  age: 25,
  country: 'USA'
}

const { name, age, country } = user;
```



2. Destructured function output



```
//Function call
const userInfo = getUserInfo(userId); 

//Destructured properties
const { name, age, email } = userInfo;
```



3. Destructured imports and exports



```
// Imports
import { prop1, prop2, prop3 } from './exampleProperties';

// Exports
export const prop1 = 'value1';
export const prop2 = 'value2';
export const prop3 = 'value3';
```



4. Nested destructuring



```
const person = {
  name: {
    first: 'John',
    last: 'Doe',
  },
  age: 26,
  location: {
    city: 'New York',
    state: 'NY',
  },
};

const {
  name: { first, last },
  location: { city, state },
} = person;
```



5. Isolating the “rest” of the props into a variable



```
const person = {
  name: 'John',
  age: 30,
  occupation: 'Software Engineer',
  hobbies: ['hiking', 'fishing', 'cooking']
}

const { name, age, ...rest } = person;
```



6. Destructuring with aliased keys



```
const user = {
    name: 'John Doe',
    age: 42,
    email: 'john@doe.com'
};

const { name: username, age: userAge, email: userEmail } = user;

console.log(username); // 'John Doe'
console.log(userAge); // 42
console.log(userEmail); // 'john@doe.com'
```



7. Can also be used on arrays



```
const [a, b] = array;
const [a, , b] = array;
const [a = aDefault, b] = array;
const [a, b, ...rest] = array;
const [a, , b, ...rest] = array;
const [a, b, ...{ pop, push }] = array;
const [a, b, ...[c, d]] = array;
```



### Conclusion

In conclusion, object destructuring is a powerful tool that allows developers to quickly and easily access data stored in complex object structures. While there are some drawbacks to object destructuring, the benefits far outweigh the disadvantages, making it a great tool for any developer to have in their toolbox.

[GitHub - ryanmcdermott/clean-code-javascript: Clean Code concepts adapted for JavaScript](https://github.com/ryanmcdermott/clean-code-javascript#function-arguments-2-or-fewer-ideally)

![medium 03](/blog/the-beauty-of-es6s-object-destructuring-assignment/images/medium-03.png)
