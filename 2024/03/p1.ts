function aocd03p01(text: string) {
  const mulPattern = /mul\((\d+\,\d+)\)/g;

  const array = [...text.matchAll(mulPattern)];

  let sum = 0;

  array.forEach((v) => {
    sum += v[1].split(",").reduce((prev, curr) => prev * parseInt(curr), 1);
  });

  return sum;
}
const file = Bun.file("./2024/03/input.txt");
const text = await file.text();

const a = aocd03p01(text);

console.info(a);
