function aocd05p02(text: string) {
  const splittedText = text.trim().split("\n\n");
  let sum = 0;

  const rules = splittedText[0];
  // create new mapping of rules
  // {
  //    [entry]: [all possible next values]
  // }
  const rulesMap: Record<string, string[]> = {};

  rules.split("\n").forEach((rule) => {
    const splittedRule = rule.split("|");
    const key = splittedRule[0];
    const next = splittedRule[1];
    if (key in rulesMap) {
      rulesMap[key] = [...rulesMap[key], next];
    } else rulesMap[key] = [next];
  });

  const updates = splittedText[1];
  updates.split("\n").forEach((update) => {
    let validUpdate = true;
    update.split(",").forEach((entry, i, arr) => {
      if (i !== 0 && entry in rulesMap && validUpdate) {
        validUpdate = !arr.slice(0, i).some((v) => rulesMap[entry].includes(v));
      }
    });
    if (!validUpdate) {
      const u = checkIfValid(update.split(","), rulesMap);
      const el = u[Math.round((u.length - 1) / 2)];
      // get the element in the middle
      sum += parseInt(el);
    }
  });
  return sum;
}

function checkIfValid(update: string[], rulesMap: Record<string, string[]>) {
  update.forEach((entry, i) => {
    if (entry in rulesMap && i !== 0) {
      rulesMap[entry].forEach((v) => {
        const toChange = update.slice(0, i).findIndex((s) => s === v);
        if (toChange !== -1) {
          [update[toChange], update[i]] = [update[i], update[toChange]];
          checkIfValid(update, rulesMap);
        }
      });
    }
  });
  return update;
}

const file = Bun.file("./2024/05/input.txt");
const text = await file.text();

const a = aocd05p02(text);

console.info(a);
