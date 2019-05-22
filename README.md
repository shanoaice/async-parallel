# async-parallel

> A zero-dependency async parallel task runner. Powered by Promise.

*NOTE: This package is designed for both Webpack and Node.js usage, but if you are using a enviroment that does not support Promise (such as IE) you need to polyfill it by yourself.*

## Install

``` bash
npm install async-parallel
```

Then import it use either CommonJS:
``` js
const parallel = require('async-parallel');
```
or ESModule:
``` js
import parallel from 'async-parallel'
```

## Usage (more of a mixture of guideline and design idea)

First you need to pass two parameters to the `parallel` function. One object and one callback function.

The object contains two things: the task list (property `tasks`) and a optional parameter that will be passed to the ***outer layer function***.

The `tasks` property should be an `Array`, a `Generator` or a `Set`. It contains the task that you want to run.

You can see that I emphasized the "outer layer function". This library is powered by `Promise`, so the task should orginally recieve only two parameter, `resolve` and `reject` as in [Using promises at MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises), but what if you want to give your task something from outside that only works in the task function's scope? The solution is to wrap your function that will return a function that actually become the `Promise`. The ***outer layer*** will recieve that thing as a parameter, and then the ***outer layer*** will retern the ***inner layer*** function that actually executes in the promise. Because of  closure, the ***inner function*** can still access the variables in the ***outer function's scope***. Here's a example:
``` js
functon eg(param) {
  return function (resolve,reject) {}
}
```
The returned function is what actually run in the `Promise`.

The recommended way to pass in the task list is to use an `Array`, but you can also use `Generator` or `Set` too.

There is also something tricky about the callback function that you need to provide. The callback function will be called more than once. 
