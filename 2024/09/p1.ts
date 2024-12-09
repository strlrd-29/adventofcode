function aocd09p01(text: string) {
  const diskMap = text
    .trim()
    .split("")
    .map((c) => parseInt(c));
  let id = 0;
  let blocks: (number | ".")[] = [];
  diskMap.forEach((entry, idx) => {
    if (idx % 2 === 0) {
      blocks.push(...Array(entry).fill(id));
      id++;
    }
    if (idx % 2 === 1) {
      blocks.push(...Array(entry).fill("."));
    }
  });

  const reversedBlocks = blocks.toReversed();
  for (let i = 0; i < blocks.filter((b) => b === ".").length; i++) {
    const block = reversedBlocks[i];
    if (block !== ".") {
      const b = reversedBlocks.findLastIndex((b) => b === ".");
      if (b !== -1) {
        [reversedBlocks[b], reversedBlocks[i]] = [block, "."];
      }
    }
  }

  let sum = 0;
  reversedBlocks
    .toReversed()
    .filter((b) => b !== ".")
    .forEach((b, idx) => {
      sum += b * idx;
    });

  return sum;
}

const file = Bun.file("./2024/09/input.txt");
const text = await file.text();

const a = aocd09p01(text);

console.info(a);
