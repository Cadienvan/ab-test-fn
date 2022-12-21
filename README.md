# What is this?

A higher-order function to provide an A/B testing mechanism with multiple weights.

# How do I install it?

```bash
npm install ab-test-fn
```

# How can I use it?

## Use-case #1 - Simple A/B testing

In this scenario, we want to test two versions of a function, `fnA` and `fnB`, and we want to run `fnA` 80% of the time and `fnB` 20% of the time.

```javascript
import { AB } from 'ab-test-fn';

const fnA = () => console.log('fnA');
const fnB = () => console.log('fnB');

const fnAB = AB(fnA, fnB, [0.8, 0.2]);

fnAB(); // Will log 'fnA' 80% of the time and 'fnB' 20% of the time
```

## Use-case #2 - A/B testing with multiple weights

In this scenario, we want to test three versions of a function, `fnA`, `fnB` and `fnC`, and we want to run `fnA` 50% of the time, `fnB` 30% of the time and `fnC` 20% of the time.

```javascript
import { AB } from 'ab-test-fn';

const fnA = () => console.log('fnA');
const fnB = () => console.log('fnB');
const fnC = () => console.log('fnC');

const fnABC = AB(fnA, fnB, fnC, [0.5, 0.3, 0.2]);

fnABC(); // Will log 'fnA' 50% of the time, 'fnB' 30% of the time and 'fnC' 20% of the time
```

# API

The `AB` function accepts an indefinite number of functions and an array of weights. The weights can be either integers or floats, they don't have to add up to 1. The function will return a new function that will run one of the provided functions based on the sum of the weights.

# Tests

You can run the tests by using the following command:

```bash
npm test
```