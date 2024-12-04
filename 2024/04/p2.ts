function aocd04p02(text: string) {
  const splittedText = text.split("\n");
  let count = 0;

  splittedText.forEach((s, i) => {
    s.split("").forEach((c, j) => {
      if (c === "A") {
        if (i > 0 && j > 0 && i < splittedText.length - 1 && j < s.length - 1) {
          const possible_combinations =
            (splittedText[i - 1][j - 1] + c + splittedText[i + 1][j + 1] ===
              "MAS" ||
              splittedText[i + 1][j + 1] + c + splittedText[i - 1][j - 1] ===
                "MAS") &&
            (splittedText[i + 1][j - 1] + c + splittedText[i - 1][j + 1] ===
              "MAS" ||
              splittedText[i - 1][j + 1] + c + splittedText[i + 1][j - 1] ===
                "MAS");

          if (possible_combinations) count++;
        }
      }
    });
  });
  return count;
}
const file = Bun.file("./2024/04/input.txt");
const text = await file.text();

const a = aocd04p02(text);

console.info(a);

//.M.S......
//..A..MSMS.
//.M.S.MAA..
//..A.ASMSM.
//.M.S.M....
//..........
//S.S.S.S.S.
//.A.A.A.A..
//M.M.M.M.M.
//S.M.......
//.A........
//S.M.......
