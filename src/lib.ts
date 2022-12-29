export function AB(...args: unknown[]): Function {
  if (args.length < 3) {
    throw new Error(
      'You must provide at least 3 arguments. At least two functions must be provided and an array of weights'
    );
  }

  const fns = args.slice(0, -1);
  const weights = args[args.length - 1];

  if (!Array.isArray(weights)) {
    throw new Error('The last argument must be an array of weights');
  }

  if (args.length - 1 !== weights.length) {
    throw new Error(
      'The number of weights must be equal to the number of functions'
    );
  }

  if (weights.some((weight: unknown) => typeof weight !== 'number')) {
    throw new Error('All weights must be numbers');
  }

  if (weights.some((weight: number) => weight < 0)) {
    throw new Error('All weights must be positive');
  }

  if (fns.some((fn: unknown) => typeof fn !== 'function')) {
    throw new Error('All arguments except the last must be functions');
  }

  return (...inArgs) => {
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    const random = Math.random() * totalWeight;
    let weight = 0;
    for (let i = 0; i < fns.length; i++) {
      weight += weights[i];
      if (random <= weight) {
        return (fns[i] as Function)(...inArgs);
      }
    }
  };
}
