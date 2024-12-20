function aocd05p01(text: string) {
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
  // next we iterate over the updates
  // check for the current entry if any
  // of the previous entries are in the
  // next values list
  updates.split("\n").forEach((update) => {
    let validUpdate = true;
    update.split(",").forEach((entry, i, arr) => {
      if (i !== 0 && entry in rulesMap && validUpdate) {
        validUpdate = !arr.slice(0, i).some((v) => rulesMap[entry].includes(v));
      }
    });
    if (validUpdate) {
      const splittedUpdate = update.split(",");
      const el = splittedUpdate[Math.round((splittedUpdate.length - 1) / 2)];
      // get the element in the middle
      sum += parseInt(el);
    }
  });
  return sum;
}

const file = Bun.file("./2024/05/input.txt");
const text = await file.text();

const a = aocd05p01(text);

console.info(a);
