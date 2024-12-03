function aocd03p02(text: string) {
  const mulPattern = /mul\((\d+\,\d+)\)|do\(\)|don\'t\(\)/g;

  const array = [...text.matchAll(mulPattern)];

  let enabled = true;
  let sum = 0;

  array.forEach((v) => {
    if (v[0] === "don't()") enabled = false;
    if (v[0] === "do()") enabled = true;
    if (enabled && v[1])
      sum += v[1].split(",").reduce((prev, curr) => prev * parseInt(curr), 1);
  });

  return sum;
}
const file = Bun.file("./2024/03/input.txt");
const text = await file.text();

const a = aocd03p02(text);

console.info(a);
