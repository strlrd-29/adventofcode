function exploreTrail(
  x: number,
  y: number,
  map: number[][],
  score: number,
  reachedTops: string[] = [],
) {
  const [nextUpX, nextUpY] = [x, y - 1];
  const [nextDownX, nextDownY] = [x, y + 1];
  const [nextRightX, nextRightY] = [x + 1, y];
  const [nextLeftX, nextLeftY] = [x - 1, y];
  // check if we are still inside the bounds of the map
  const current = map[y][x];

  const nextUp = map?.[nextUpY]?.[nextUpX];
  const nextDown = map?.[nextDownY]?.[nextDownX];
  const nextRight = map?.[nextRightY]?.[nextRightX];
  const nextLeft = map?.[nextLeftY]?.[nextLeftX];

  if (current === 9) {
    const top = `${x}${y}`;
    if (!reachedTops.includes(top)) {
      reachedTops.push(top);
      score++;
    }
  }

  const next = current + 1;

  if (next === nextUp) {
    score = exploreTrail(nextUpX, nextUpY, map, score, reachedTops);
  }
  if (next === nextDown) {
    score = exploreTrail(nextDownX, nextDownY, map, score, reachedTops);
  }
  if (next === nextRight) {
    score = exploreTrail(nextRightX, nextRightY, map, score, reachedTops);
  }
  if (next === nextLeft) {
    score = exploreTrail(nextLeftX, nextLeftY, map, score, reachedTops);
  }

  return score;
}

function aocd010p01(text: string) {
  const map = text
    .trim()
    .split("\n")
    .map((row) => row.split("").map((c) => parseInt(c)));

  let sum = 0;
  map.forEach((row, idx) => {
    let trailHeads: number[][] = [],
      i = -1;
    while ((i = row.indexOf(0, i + 1)) != -1) {
      trailHeads.push([i, idx]);
    }
    if (trailHeads.length) {
      trailHeads.forEach((trailHead) => {
        // follow the trail
        sum += exploreTrail(trailHead[0], trailHead[1], map, 0);
      });
    }

    return;
  });

  return sum;
}

const file = Bun.file("./2024/10/input.txt");
const text = await file.text();

const a = aocd010p01(text);

console.info(a);
