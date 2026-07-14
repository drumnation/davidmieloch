---
title: "Reuse your code: Authoring your own Universal Library with Webpack"
description: "Are you looking to build a custom library using webpack? With the right setup, webpack can help you create a library that can be used by other developers in their projects. This is"
publishedAt: "2023-02-03"
status: "published"
sourcePlatform: "medium"
sourceUrl: "https://medium.com/@davidmieloch/reuse-your-code-authoring-your-own-universal-library-with-webpack-89d43e6ea9df"
canonicalUrl: "https://davidmieloch.com/blog/reuse-your-code-authoring-your-own-universal-library-with-webpack"
coverImage: "/blog/reuse-your-code-authoring-your-own-universal-library-with-webpack/images/medium-01.png"
series: "Legacy Engineering Notes"
tags: ["webpack", "javascript"]
---

Are you looking to build a custom library using webpack? With the right setup, webpack can help you create a library that can be used by other developers in their projects. This is also helpful if you’d like to share your own code with many of your own projects to avoid needless code repetition.

In this blog post, we’ll discuss the steps to create a custom library with webpack.

![medium 01](/blog/reuse-your-code-authoring-your-own-universal-library-with-webpack/images/medium-01.png)

First, you need to install webpack and the necessary packages.



```
npm install webpack
```



After that, you’ll need to create a webpack.config.js file in your project root. This file will contain the configuration for webpack.

Next, you’ll need to create the library itself. This can be done by creating a new folder in your project root and adding the necessary files. These files should include the code for your library, as well as any HTML, CSS, and JS files needed for the library to function properly.

Once the library is created, you’ll need to configure webpack to bundle the library. This can be done by adding the following code to your webpack.config.js file:



```
module.exports = {
 entry: './src/index.js',
 output: {
 path: path.resolve(__dirname, 'dist'),
 filename: 'my-library.js',
 library: 'myLibrary',
 libraryTarget: 'umd',
 umdNamedDefine: true
 },
 …
};
```



This code will tell webpack to bundle the library and export it as a UMD module, which can be imported into other projects.

Finally, you’ll need to run webpack to build the library. This can be done by running the command “webpack”.



```
webpack
```



Once the build is complete, you’ll have a custom library that can be imported into other projects.

![medium 02](/blog/reuse-your-code-authoring-your-own-universal-library-with-webpack/images/medium-02.png)

### Publish your package to NPM

Once you have that you’ll want to publish your library either publicly or privately on NPM so it can be easily installed in other projects.

[Creating and publishing private packages | npm Docs](https://docs.npmjs.com/creating-and-publishing-private-packages)

### Helpful Tools

While developing your library locally you might want to avoid having to build and republish it to npm after every single code change. This handy library exists to automatically build the code on each save, copying over what’s installed in your project’s /node_modules folder.

[GitHub - mweststrate/relative-deps: Installs local dependencies for optimal developer experience](https://github.com/mweststrate/relative-deps)

### Conclusion

By following these steps, you can easily create a custom library with webpack. This can be a great way to share code with other developers and create reusable components for your projects.

### For more information see the webpack docs:

[Authoring Libraries | webpack](https://webpack.js.org/guides/author-libraries/)
