// we have only two operators + and *
// we need to try all combinations of + and *
// on the numbers list
// when we first get a match we break out of the iteration
// and jump to the next one

// 1. get the number of possible permutations base on the length of the numbers list => number of permutations is
// 2^(length of numbers list - 1)
// 2. figure out a way to alternate between the operators

// c = [
//   ["+", "+"],
//   ["+", "*"],
//   ["*", "+"],
//   ["*", "*"],
// ] -> 4 = 2^2

// a = [
//   ["+", "+", "+"],
//   ["+", "+", "*"],
//   ["+", "*", "*"],
//   ["+", "+", "*"],
//   ["*", "*", "*"],
//   ["*", "*", "+"],
//   ["*", "+", "+"],
//   ["*", "+", "*"],
// ] -> 8 = 2^3

// b = [
//   ["+", "+", "+", "+"],
//   ["+", "+", "+", "*"],
//   ["+", "+", "*", "*"],
//   ["+", "+", "*", "+"],
//   ["+", "*", "*", "*"],
//   ["+", "*", "+", "*"],
//   ["+", "*", "+", "+"],
//   ["+", "*", "*", "+"],
//   ["*", "*", "*", "*"],
//   ["*", "*", "*", "+"],
//   ["*", "*", "+", "+"],
//   ["*", "*", "+", "*"],
//   ["*", "+", "+", "*"],
//   ["*", "+", "+", "+"],
//   ["*", "+", "*", "*"],
//   ["*", "+", "*", "+"],
// ] -> 16

function generateCombinations(n: number): string[] {
  const results: string[] = [];
  const operators = ["+", "*"];

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

type Operator = "+" | "*";

function aocd07p01(text: string) {
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

const a = aocd07p01(text);

console.info(a);

// 19 10 => 2 => 2
// 19+10
// 19*10
//
// 19 10 20 => 3 => 4
// 19+10+20
// 19+10*20
// 19*10*20
// 19*10+20
//
// 1 2 3 4 => 4 => 6
// 1+2+3+4
// 1+2+3*4
// 1+2*3*4
// 1+2*3+4
// 1*2*3*4
// 1*2*3+4
// 1*2+3*4
// 1*2+3+4
// number of permutations is 2^(n-1) n is the length of the numbers list
