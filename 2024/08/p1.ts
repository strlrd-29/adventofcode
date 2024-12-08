function setCharAt(str: string, index: number, chr: string) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

function aocd08p01(text: string) {
  const rows = text.trim().split("\n");

  let re = /\w/g;

  let map: Record<string, number[][]> = {};
  const maxX = rows[0].length - 1;
  const maxY = rows.length - 1;

  rows.forEach((row, idx) => {
    const a = [...row.matchAll(re)];
    if (a.length) {
      a.forEach((match) => {
        if (match[0] in map) {
          map[match[0]].push([match.index, idx]);
        } else map[match[0]] = [[match.index, idx]];
      });
    }
  });
  let count = 0;

  Object.entries(map).forEach(([k, v]) => {
    for (let i = 0; i < v.length; i++) {
      const antenna = v[i];
      v.toSpliced(i, 1).forEach((coord) => {
        const [diffX, diffY] = [antenna[0] - coord[0], antenna[1] - coord[1]];
        const [antenodeX, antenodeY] = [antenna[0] + diffX, antenna[1] + diffY];
        if (
          antenodeX >= 0 &&
          antenodeY >= 0 &&
          antenodeX <= maxX &&
          antenodeY <= maxY
        ) {
          if (rows[antenodeY][antenodeX] !== k) {
            rows[antenodeY] = setCharAt(rows[antenodeY], antenodeX, "#");
          }
        }
      });
    }
  });

  re = /#/g;

  rows.forEach((row) => {
    count += [...row.matchAll(re)].length;
  });

  return count;
}

const file = Bun.file("./2024/08/input.txt");
const text = await file.text();

const a = aocd08p01(text);

console.info(a);
