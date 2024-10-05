export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getUnsortedArray = (): number[] => {
  const arr = Array.from({ length: 10 }, (_, i) => i + 1); // Creates an array [1, 2, 3, ..., 10]

  // Shuffle function (Fisher-Yates algorithm)
  for (let i = arr.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]; // Swap elements
  }

  return arr; // Return shuffled array of 10 unique non-repeating integers
};
