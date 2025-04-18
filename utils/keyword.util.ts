export function pickRandomKeys<T extends object>(
  input: T,
  howMany: number,
  excludeKey?: keyof T
): (keyof T)[] {
  // Get all top-level keys
  let allKeys = Object.keys(input) as (keyof T)[];

  // If an excludeKey is provided, filter it out
  if (excludeKey) {
    allKeys = allKeys.filter((key) => key !== excludeKey);
  }

  // Shuffle the keys
  const shuffled = allKeys.sort(() => Math.random() - 0.5);

  // Pick the first 'howMany' keys
  return shuffled.slice(0, howMany);
}

export function getRandomKey<T extends object>(input: T): keyof T {
  // Get all the keys of the object as an array
  const keys = Object.keys(input) as (keyof T)[];

  // Pick one random key
  const randomIndex = Math.floor(Math.random() * keys.length);
  const randomKey = keys[randomIndex];

  // Return the random key
  return randomKey;
}

export function deepPartialMatch(subset: object, source: object): boolean {
  return Object.entries(subset).every(([key, value]) => {
    if (typeof value === "object" && value !== null) {
      // Recurse for nested objects
      return deepPartialMatch(value, source?.[key]);
    }
    return source?.[key] === value;
  });
}
