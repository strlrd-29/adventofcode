function aocd01p02(input: string) {
  const list1: number[] = [];
  const list2: number[] = [];

  input.split(/\s+/).map((v, idx) => {
    if (v !== "") {
      if (idx % 2 === 0) list1.push(parseInt(v));
      else list2.push(parseInt(v));
    }
  });

  if (list1.length !== list2.length)
    throw new Error("Input lists should be of the same length.");

  const similarities: number[] = [];

  list1.forEach((e) => {
    similarities.push(e * list2.filter((v) => v === e).length);
  });

  return similarities.reduce((prev, curr) => prev + curr, 0);
}

const file = Bun.file("./2024/01/input.txt");
const text = await file.text();

const sum = aocd01p02(text);

console.info(sum);
