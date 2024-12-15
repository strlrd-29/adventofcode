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

  for (let seconds = 0; seconds < 100; seconds++) {
    robots.forEach((robot, idx) => {
      const newX = robot.pos.x + robot.velocity.x;
      const newY = robot.pos.y + robot.velocity.y;
      robots[idx].pos.x =
        newX > maxX ? newX - maxX - 1 : newX < 0 ? newX + maxX + 1 : newX;
      robots[idx].pos.y =
        newY > maxY ? newY - maxY - 1 : newY < 0 ? newY + maxY + 1 : newY;
    });
  }

  // calculate number of robots in each quadrant
  const centerX = ~~(maxX / 2);
  const centerY = ~~(maxY / 2);

  const q1 = [
    [0, centerX - 1],
    [0, centerY - 1],
  ];
  const q2 = [
    [centerX + 1, maxX],
    [0, centerY - 1],
  ];

  const q3 = [
    [0, centerX - 1],
    [centerY + 1, maxY],
  ];
  const q4 = [
    [centerX + 1, maxX],
    [centerY + 1, maxY],
  ];

  const quadrants = [q1, q2, q3, q4];

  let secFactor = 1;
  quadrants.forEach((q) => {
    const robotsInQ = robots.filter(
      (r) =>
        r.pos.x >= q[0][0] &&
        r.pos.x <= q[0][1] &&
        r.pos.y >= q[1][0] &&
        r.pos.y <= q[1][1],
    ).length;
    if (robotsInQ) secFactor *= robotsInQ;
  });

  return secFactor;
}

const file = Bun.file("./2024/14/input.txt");
const text = await file.text();

const a = aocd14p01(text);

console.table(a);
