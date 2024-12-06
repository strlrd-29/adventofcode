type Coordinates = {
  current: "^" | ">" | "v" | "<";
  x: number;
  y: number;
};

function aocd06p01(text: string) {
  const rows = text
    .trim()
    .split("\n")
    .map((r) => r.split(""));
  let guard: Coordinates = {
    current: "^",
    x: 0,
    y: 0,
  };

  // Find initial guard coordinates
  rows.forEach((row, idx) => {
    const guardX = row.findIndex((c) => c === "^");
    if (guardX !== -1) {
      guard.x = guardX;
      guard.y = idx;
      return;
    }
  });

  while (
    guard.x > 0 &&
    guard.y > 0 &&
    guard.x < rows[0].length - 1 &&
    guard.y < rows.length - 1
  ) {
    switch (guard.current) {
      case "^":
        const prevY = guard.y - 1;
        if (prevY >= 0) {
          if (rows[prevY][guard.x] === "#") {
            guard.current = ">";
            break;
          }
        }
        guard.y -= 1;
        break;
      case ">":
        const nextX = guard.x + 1;
        if (nextX <= rows[0].length - 1) {
          if (rows[guard.y][guard.x + 1] === "#") {
            guard.current = "v";
            break;
          }
        }
        guard.x += 1;
        break;
      case "v":
        const nextY = guard.y + 1;
        if (nextY <= rows.length - 1) {
          if (rows[guard.y + 1][guard.x] === "#") {
            guard.current = "<";
            break;
          }
        }
        guard.y += 1;
        break;
      case "<":
        const prevX = guard.x - 1;
        if (prevX >= 0) {
          if (rows[guard.y][guard.x - 1] === "#") {
            guard.current = "^";
            break;
          }
        }
        guard.x -= 1;
        break;
    }
    rows[guard.y][guard.x] = guard.current;
  }

  let re = /v|\^|\>|\</g;
  const a = [...rows.join().matchAll(re)].length;

  return a;
}

const file = Bun.file("./2024/06/input.txt");
const text = await file.text();

const a = aocd06p01(text);

console.info(a);
