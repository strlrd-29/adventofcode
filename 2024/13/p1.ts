function aocd13p01(text: string) {
  const machines = text
    .trim()
    .split("\n\n")
    .map((row) => row.split("\n"));

  let cost = 0;

  machines.forEach((machine) => {
    // We use Cramer's rule where we solve a system of 2 equations
    // ax + by = e |            e   b                a   e
    //             |        det                  det
    //             |            f   d                c   f
    //              => x = ------------ =>  y = ----------
    //             |            a   b                a   b
    //             |        det                  det
    // cx + dy = f |            c   d                c   d
    const xRegex = /X\+\d+/;
    const yRegex = /Y\+\d+/;
    const eRegex = /X\=\d+/;
    const fRegex = /Y\=\d+/;
    const a = parseInt(machine[0].match(xRegex)?.[0].split("+")[1]!);
    const b = parseInt(machine[1].match(xRegex)?.[0].split("+")[1]!);
    const c = parseInt(machine[0].match(yRegex)?.[0].split("+")[1]!);
    const d = parseInt(machine[1].match(yRegex)?.[0].split("+")[1]!);
    const e = parseInt(machine[2].match(eRegex)?.[0].split("=")[1]!);
    const f = parseInt(machine[2].match(fRegex)?.[0].split("=")[1]!);
    if (a && b && c && d && e && f) {
      const detABCD = a * d - c * b;
      const detEBFD = e * d - f * b;
      const detAECF = a * f - c * e;
      const x = detEBFD / detABCD;
      const y = detAECF / detABCD;
      if (Number.isInteger(x) && Number.isInteger(y)) {
        if (x < 100 && y < 100) {
          cost += x * 3 + y;
        }
      }
    }
  });
  return cost;
}

const file = Bun.file("./2024/13/input.txt");
const text = await file.text();

const a = aocd13p01(text);

console.table(a);
