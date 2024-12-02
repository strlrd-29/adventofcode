function aocd01p01(input: string) {
  const list1: number[] = [];
  const list2: number[] = [];

  input
    .trim()
    .split(/\s+/)
    .map((v, idx) => {
      if (idx % 2 === 0) list1.push(parseInt(v));
      else list2.push(parseInt(v));
    });

  if (list1.length !== list2.length)
    throw new Error("Input lists should be of the same length.");

  list1.sort();
  list2.sort();

  let sum = 0;

  list1.forEach((v, idx) => {
    sum += Math.abs(v - list2[idx]);
  });

  return sum;
}

const file = Bun.file("./2024/01/input.txt");
const text = await file.text();

const sum = aocd01p01(text);

console.info(sum);
