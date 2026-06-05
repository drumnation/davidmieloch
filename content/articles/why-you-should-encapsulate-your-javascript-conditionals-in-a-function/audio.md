---
title: "Why you should Encapsulate your Javascript Conditionals in a Function - Audio Version"
sourceArticle: "why-you-should-encapsulate-your-javascript-conditionals-in-a-function"
sourceHash: "b77fd1d112922c20389276448e97bd1ac3f8e8d3531b99402f9f55b5f30ab304"
status: "needs-approval"
preparedAt: "2026-06-05T04:38:37.281Z"
format: "spoken-markdown-v1"
---

Conditional statements are a crucial aspect of programming but can often be challenging to read and understand. They tend to be long and detailed, including multiple edge cases that might not be relevant while scanning the code. This makes it difficult for developers to understand the flow of the program and what the conditional statement is doing.

One way to improve the readability of conditional statements is to encapsulate them in a function. By doing this, you can assign a name to the conditional, which provides the necessary context for someone scanning the code. The name should explain what the conditional is evaluating and what data it is using.

Using pure functions that rely solely on arguments for data input can further enhance the readability of the code. This also makes it easier to move the conditional statement to a different file, as the arguments provide a clear context for the conditional. Additionally, functions are often displayed in a bold font in code editors, making them easier to spot, and highlighting the flow of the program.

As you can see even the best conditionals aren’t very scannable. You have to stop and read the conditional closely and evaluate its context in order to understand what it’s actually doing.

Conditionals are also often long and verbose, accounting for many edge cases when necessary, but in the natural flow of the program you shouldn’t need to understand how all of that works while scanning, you just want to know the flow of the program.

Encapsulating your conditional in a function gives you the opportunity to give it a name, and that name can provide all the explanation necessary for someone scanning the code to know what the condition is and what data is being evaluated from the argument of the function.

If you’re testing, encapsulating makes it super easy to test each conditional in your app.

Encapsulate your conditionals.

This is one clean code tip I rarely see actually being used around on the web and I think people are really missing out on an easy way to make their code more readable with only a little bit more added code and effort.

GitHub - ryanmcdermott/clean-code-javascript: Clean Code concepts adapted for JavaScript
