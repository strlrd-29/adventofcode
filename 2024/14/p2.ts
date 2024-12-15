interface Pos {
  x: number;
  y: number;
}

interface Velocity {
  x: number;
  y: number;
}

interface Robot {
  pos: Pos;
  velocity: Velocity;
}

function aocd14p01(text: string) {
  const numbersRegex = /-?\d+/g;
  const robots: Robot[] = text
    .trim()
    .split("\n")
    .map((r) => {
      const [pos, velocity] = r.split(/\s/);
      return {
        pos: {
          x: parseInt(pos.match(numbersRegex)?.[0]!),
          y: parseInt(pos.match(numbersRegex)?.[1]!),
        },
        velocity: {
          x: parseInt(velocity.match(numbersRegex)?.[0]!),
          y: parseInt(velocity.match(numbersRegex)?.[1]!),
        },
      };
    });

  const maxX = 100;
  const maxY = 102;

  let step = 0;
  while (true) {
    step++;
    robots.forEach((robot, idx) => {
      const newX = robot.pos.x + robot.velocity.x;
      const newY = robot.pos.y + robot.velocity.y;
      const x =
        newX > maxX ? newX - maxX - 1 : newX < 0 ? newX + maxX + 1 : newX;
      const y =
        newY > maxY ? newY - maxY - 1 : newY < 0 ? newY + maxY + 1 : newY;
      robots[idx].pos.x = x;
      robots[idx].pos.y = y;
    });

    // find all unique positions
    const positions = new Set(
      robots.map((robot) => `${robot.pos.x},${robot.pos.y}`),
    );

    for (const position of positions) {
      const [x, y] = position.split(",").map((num) => parseInt(num));
      let hasGroup = true;

      for (let j = -2; j <= 2; j++) {
        for (let k = -2; k <= 2; k++) {
          if (!positions.has(`${x + k},${y + j}`)) {
            hasGroup = false;
            break;
          }
        }
        if (!hasGroup) break;
      }

      if (hasGroup) return step;
    }
  }
}

const file = Bun.file("./2024/14/input.txt");
const text = await file.text();

const a = aocd14p01(text);

console.table(a);
