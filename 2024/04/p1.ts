function aocd04p01(text: string) {
  const splittedText = text.split("\n");
  let count = 0;
  splittedText.forEach((s, i) => {
    s.split("").forEach((c, j) => {
      if (c === "X") {
        // horizontal check
        if (c + s[j + 1] + s[j + 2] + s[j + 3] === "XMAS") {
          count++;
          console.info(i, j);
        }
        if (c + s[j - 1] + s[j - 2] + s[j - 3] === "XMAS") {
          count++;
          console.info(i, j);
        }
        // vertical check
        if (i > 2) {
          if (
            c +
              splittedText[i - 1][j] +
              splittedText[i - 2][j] +
              splittedText[i - 3][j] ===
            "XMAS"
          ) {
            count++;
            console.info(i, j);
          }
        }
        if (i < splittedText.length - 3) {
          if (
            c +
              splittedText[i + 1][j] +
              splittedText[i + 2][j] +
              splittedText[i + 3][j] ===
            "XMAS"
          ) {
            count++;
            console.info(i, j);
          }
        }
        // diagonal check
        if (i < splittedText.length - 3 && j < s.length - 3) {
          if (
            c +
              splittedText[i + 1][j + 1] +
              splittedText[i + 2][j + 2] +
              splittedText[i + 3][j + 3] ===
            "XMAS"
          ) {
            count++;
            console.info(i, j);
          }
        }
        if (i > 2 && j < s.length - 3) {
          if (
            c +
              splittedText[i - 1][j + 1] +
              splittedText[i - 2][j + 2] +
              splittedText[i - 3][j + 3] ===
            "XMAS"
          ) {
            count++;
            console.info(i, j);
          }
        }
        if (i > 2 && j > 2) {
          if (
            c +
              splittedText[i - 1][j - 1] +
              splittedText[i - 2][j - 2] +
              splittedText[i - 3][j - 3] ===
            "XMAS"
          ) {
            count++;
            console.info(i, j);
          }
        }
        if (i < splittedText.length - 3 && j > 2) {
          if (
            c +
              splittedText[i + 1][j - 1] +
              splittedText[i + 2][j - 2] +
              splittedText[i + 3][j - 3] ===
            "XMAS"
          ) {
            count++;
            console.info(i, j);
          }
        }
      }
    });
  });

  return count;
}
const file = Bun.file("./2024/04/input.txt");
const text = await file.text();

const a = aocd04p01(text);

console.info(a);
