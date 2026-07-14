---
title: "Why you should Encapsulate your Javascript Conditionals in a Function"
description: "Conditional statements are a crucial aspect of programming but can often be challenging to read and understand. They tend to be long and detailed, including multiple edge cases tha"
publishedAt: "2023-02-01"
status: "published"
sourcePlatform: "medium"
sourceUrl: "https://medium.com/@davidmieloch/why-you-should-encapsulate-your-javascript-conditionals-in-a-function-4a492853c397"
canonicalUrl: "https://davidmieloch.com/blog/why-you-should-encapsulate-your-javascript-conditionals-in-a-function"
coverImage: "/blog/why-you-should-encapsulate-your-javascript-conditionals-in-a-function/images/medium-01.png"
series: "Legacy Engineering Notes"
tags: ["organization", "code", "javascript"]
---

Conditional statements are a crucial aspect of programming but can often be challenging to read and understand. They tend to be long and detailed, including multiple edge cases that might not be relevant while scanning the code. This makes it difficult for developers to understand the flow of the program and what the conditional statement is doing.

![medium 01](/blog/why-you-should-encapsulate-your-javascript-conditionals-in-a-function/images/medium-01.png)

One way to improve the readability of conditional statements is to encapsulate them in a function. By doing this, you can assign a name to the conditional, which provides the necessary context for someone scanning the code. The name should explain what the conditional is evaluating and what data it is using.



```
// Original code
if (user.isAdmin && user.hasAccess && (user.role === 'Manager' || user.role === 'Developer')) {
  // Perform some action
}

// Refactored code
function hasPermission(user) {
  return user.isAdmin && user.hasAccess && (user.role === 'Manager' || user.role === 'Developer');
}

if (hasPermission(user)) {
  // Perform some action
}
```



Using pure functions that rely solely on arguments for data input can further enhance the readability of the code. This also makes it easier to move the conditional statement to a different file, as the arguments provide a clear context for the conditional. Additionally, functions are often displayed in a bold font in code editors, making them easier to spot, and highlighting the flow of the program.



```
function isAgeGreaterOrEqualTo18(age) {
  return age >= 18;
}

function isMaleOrFemale(gender) {
  return gender === 'male' || gender === 'female';
}

function isLocationNewYorkOrCalifornia(location) {
  return location === 'New York' || location === 'California';
}
```



As you can see even the best conditionals aren’t very scannable. You have to stop and read the conditional closely and evaluate its context in order to understand what it’s actually doing.

Conditionals are also often long and verbose, accounting for many edge cases when necessary, but in the natural flow of the program you shouldn’t need to understand how all of that works while scanning, you just want to know the flow of the program.



```
// Create a function that checks if a number is divisible by 3
function isDivisibleByThree(num) {
  return num % 3 === 0;
}

// Create a function that checks if a number is divisible by 5
function isDivisibleByFive(num) {
  return num % 5 === 0;
}

// Create a function that checks if a number is divisible by both 3 and 5
function isDivisibleByBoth(num) {
  return isDivisibleByThree(num) && isDivisibleByFive(num);
}

// Create a function that checks if a number is divisible by either 3 or 5
function isDivisibleByEither(num) {
  return divisibleByThree(num) || divisibleByFive(num);
}

// Call the functions
isDivisibleByBoth(15); // prints "15 is divisible by both 3 and 5"
isDivisibleByEither(14); // prints "14 is divisible by either 3 or 5"
```



Encapsulating your conditional in a function gives you the opportunity to give it a name, and that name can provide all the explanation necessary for someone scanning the code to know what the condition is and what data is being evaluated from the argument of the function.

![medium 02](/blog/why-you-should-encapsulate-your-javascript-conditionals-in-a-function/images/medium-02.png)

If you’re testing, encapsulating makes it super easy to test each conditional in your app.



```
const isNumberGreaterThan10 = (num) => {
  return num > 10;
};

test('isNumberGreaterThan10 function should return true if the number is greater than 10', () => {
  expect(isNumberGreaterThan10(11)).toBe(true);
});
```



### Encapsulate your conditionals

This is one clean code tip I rarely see actually being used around on the web and I think people are really missing out on an easy way to make their code more readable with only a little bit more added code and effort.

[GitHub - ryanmcdermott/clean-code-javascript: Clean Code concepts adapted for JavaScript](https://github.com/ryanmcdermott/clean-code-javascript#encapsulate-conditionals)
