export function path<T>(aPath: string[], state: any): T {
  let prop = state;

  while (aPath.length) {
    if (typeof prop === 'undefined') {
      return prop;
    }
    prop = prop[aPath.shift()];
  }

  return prop;
}
