function generateCombinations(n: number): string[] {
  const results: string[] = [];
  const operators = ["+", "*", "|"];

  function backtrack(path: string, depth: number) {
    if (depth === n) {
      results.push(path);
      return;
    }

    for (const operator of operators) {
      backtrack(path + operator, depth + 1);
    }
  }

  backtrack("", 0);
  return results;
}

type Operator = "+" | "*" | "|";

function aocd07p02(text: string) {
  const equations = text.trim().split("\n");
  let sum = 0;
  equations.forEach((eq) => {
    const splittedEq = eq.split(": ");
    const [testRes, numbers] = [
      parseInt(splittedEq[0]),
      splittedEq
        .splice(1)[0]
        .split(" ")
        .map((n) => parseInt(n)),
    ];

    const combinations = generateCombinations(numbers.length - 1);
    combinations.some((comb) => {
      let res = numbers[0];
      (comb.split("") as Operator[]).forEach((operator, idx) => {
        switch (operator) {
          case "+":
            res += numbers[idx + 1];
            break;
          case "*":
            res *= numbers[idx + 1];
            break;
          case "|":
            res = parseInt(`${res}${numbers[idx + 1]}`);
            break;
        }
      });
      if (res === testRes) {
        sum += testRes;
        return true;
      }
    });
  });
  return sum;
}

const file = Bun.file("./2024/07/input.txt");
const text = await file.text();

const a = aocd07p02(text);

console.info(a);
