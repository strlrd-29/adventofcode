const memoize = <T extends unknown[], U>(
  fn: (...args: T) => U,
): ((...args: T) => U) => {
  const cache: Record<any, any> = {}; // Saves the values
  return (...args) => {
    const key = args.join("\n");
    return cache[key] ?? (cache[key] = fn(...args));
  };
};

/** How many stones will a stone marked `n` be after `turn` blinks? */
const count = memoize((n: number, turn: number): number => {
  if (turn === 0) return 1;
  if (n === 0) return count(1, turn - 1);
  const digits = Math.floor(Math.log10(n)) + 1;
  if (digits % 2 === 0) {
    const exp = 10 ** (digits / 2);
    return count(Math.floor(n / exp), turn - 1) + count(n % exp, turn - 1);
  }
  return count(n * 2024, turn - 1);
});

function aocd11p01(text: string) {
  const stones = text.trim().split(" ").map(Number);

  return stones.reduce((total, s) => total + count(s, 75), 0);
}

const file = Bun.file("./2024/11/input.txt");
const text = await file.text();

const a = aocd11p01(text);

console.info(a);
